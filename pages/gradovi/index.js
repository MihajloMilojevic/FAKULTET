import Auth from "../../middleware/authentication";
import Authorize from "../../middleware/authorize";
import { Grad } from "../../models";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { serialize } from "../../utils";
import { useState } from "react";

export default function Gradovi({gradovi}) {

	const [selectionModel, setSelectionModel] = useState([]);
	const [listaGradova, setListaGradova] = useState(gradovi);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createGradFormData, setCreateDialogFormData] = useState({
		naziv: ""
	})

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV', flex: 1}
	];

	async function fetchGradove() {
		try {
			const res = await fetch("/api/gradovi");
			const data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			setListaGradova(data.gradovi);
		} catch (error) {
			alert(error.message);
		}
	}
	async function Delete() {
		try {
			let res = await fetch("/api/gradovi", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE",
				body: JSON.stringify({ids: selectionModel})
			})
			let data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			await fetchGradove();
			alert("Uspesno obrisano");
		}
		catch(error) {
			alert(error.message);
		}
	}

	async function createGrad(data) {
		try {
			const json = await fetch("/api/gradovi", {
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
			...createGradFormData,
			[e.target.name]: e.target.value
		})
	}

	const handleCreateDialogConfirm = async () => {
		await createGrad(createGradFormData);
		await fetchGradove();
		setCreateDialogOpen(false);
		setCreateDialogFormData({
			id_grada: "",
			naziv: ""
		})
	}

	return (
		<div>
			<h1>GRADOVI</h1>
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
				rows={listaGradova.map(el => ({
					id: el.id_grada, 
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
				<DialogTitle>Dodaj grad</DialogTitle>
				<DialogContent>					
					<TextField
					name="id_grada"
					margin="dense"
					id="id_grada"
					label="Id grada"
					type="text"
					fullWidth
					variant="standard"
					value={createGradFormData.id_grada}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="naziv"
					margin="dense"
					id="id_grada"
					label="Naziv grada"
					type="text"
					fullWidth
					variant="standard"
					value={createGradFormData.naziv}
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
		const data = await Grad.query(
			"SELECT * FROM gradovi ORDER BY naziv"
		);
		const props = {gradovi: serialize(data)};
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
