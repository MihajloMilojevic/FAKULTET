import Auth from "../../middleware/authentication";
import Authorize from "../../middleware/authorize";
import { Grupa } from "../../models";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { serialize } from "../../utils";
import { useState, useRef } from "react";

export default function Grupe({grupe}) {
	const [selectionModel, setSelectionModel] = useState([]);
	const [listaGrupa, setListaGrupa] = useState(grupe);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createGrupaFormData, setCreateDialogFormData] = useState({
		naziv: ""
	})

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV', flex: 1}
	];

	async function fetchGrupe() {
		try {
			const res = await fetch("/api/grupa");
			const data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			setListaGrupa(data.grupe);
		} catch (error) {
			alert(error.message);
		}
	}
	async function Delete() {
		try {
			let res = await fetch("/api/grupa", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE",
				body: JSON.stringify({ids: selectionModel})
			})
			let data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			await fetchGrupe();
			alert("Uspesno obrisano");
		}
		catch(error) {
			alert(error.message);
		}
	}

	async function createGrupa(data) {
		try {
			const json = await fetch("/api/grupa", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify(data)
			})
			const res = await json.json();
			console.log(res);
			if(!res.ok)
				throw new Error(res.message);
		} catch (error) {
			alert(error.message)
		}
	}

	const handleCreateDialogClose = () => {
		setCreateDialogOpen(false);
	};

	const handleCreateDialogFormDataChange = e => {
		setCreateDialogFormData({
			...createGrupaFormData,
			[e.target.name]: e.target.value
		})
	}

	const handleCreateDialogConfirm = async () => {
		await createGrupa(createGrupaFormData);
		await fetchGrupe();
		setCreateDialogOpen(false);
		setCreateDialogFormData({
			naziv: ""
		})
	}

	return (
		<div>
			<h1>Grupe</h1>
			<Button
				onClick={Delete}
			>
			  OBRIŠI
			</Button>
			<Button
				onClick={() => setCreateDialogOpen(true)}
			>
			  DODAJ
			</Button>
			<DataGrid
				rows={listaGrupa.map(el => ({
					id: el.id_grupe, 
					naziv: el.naziv
				}))}
				columns={zaglavlje}
				pageSize={10}
				rowsPerPageOptions={[10]}
				autoHeight
				disableColumnFilter={true}
				disableColumnMenu={true}
				checkboxSelection
				disableSelectionOnClick 
				onSelectionModelChange={(newSelectionModel) => {
					setSelectionModel(newSelectionModel);
				}}
				selectionModel={selectionModel}
			/>

			<Dialog open={createDialogOpen}>
				<DialogTitle>Dodaj grupu</DialogTitle>
				<DialogContent>
					<TextField
					name="naziv"
					margin="dense"
					id="naziv"
					label="Naziv grupe"
					type="text"
					fullWidth
					variant="standard"
					value={createGrupaFormData.naziv}
					onChange={handleCreateDialogFormDataChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCreateDialogClose}>Odustani</Button>
					<Button onClick={handleCreateDialogConfirm}>Dodaj</Button>
				</DialogActions>
			</Dialog>

		</div>
	  );
}

export async function getServerSideProps({req, res}) {
	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const data = await Grupa.find({});
		const props = {grupe: serialize(data)};
		return {props};
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			  },
			  props:{},
		}
	}
}
