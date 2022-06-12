import Auth from "../../middleware/authentication";
import Authorize from "../../middleware/authorize";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { serialize } from "../../utils";
import { useState } from "react";

// https://codesandbox.io/s/skp0x7?file=/demo.js 

export default function Smerovi({smerovi, grupe}) {

	const [selectionModel, setSelectionModel] = useState([]);
	const [listaSmerova, setListaSmerova] = useState(smerovi);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createDialogFormData, setCreateDialogFormData] = useState({
		naziv: "",
		id_grupe: ""
	})

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV', flex: 1},
		{ field: 'grupa', headerName: 'GRUPA', flex: 1}
	];

	async function fetchSmer() {
		try {
			const res = await fetch("/api/smerovi");
			const data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			setListaSmerova(data.smerovi);
		} catch (error) {
			alert(error.message);
		}
	}
	async function Delete() {
		try {
			let res = await fetch("/api/smerovi", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE",
				body: JSON.stringify({ids: selectionModel})
			})
			let data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			await fetchSmer();
			alert("Uspesno obrisano");
		}
		catch(error) {
			alert(error.message);
		}
	}

	async function createSmer(data) {
		try {
			const json = await fetch("/api/smerovi", {
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
			...createDialogFormData,
			[e.target.name]: e.target.value
		})
	}

	const handleCreateDialogConfirm = async () => {
		await createSmer(createDialogFormData);
		await fetchSmer();
		setCreateDialogOpen(false);
		setCreateDialogFormData({
			id_grupe: "",
			naziv: ""
		})
	}

	return (
		<div>
			<h1>Smerovi</h1>
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
				rows={listaSmerova.map(el => ({
					id: el.id_smera, 
					naziv: el.naziv,
					grupa: el.grupa
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
					label="Naziv smera"
					type="text"
					fullWidth
					multiline
					variant="standard"
					value={createDialogFormData.naziv}
					onChange={handleCreateDialogFormDataChange}
					/>
					<Select
						id="odabir-grupe"
						value={createDialogFormData.id_grupe}
						label="Grupa"
						name="id_grupe"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
					>
						{
							grupe.map((grupa, id) => (<MenuItem key={`grupa-${id}`} value={grupa.id_grupe}>{grupa.naziv}</MenuItem>))
						}
					</Select>
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
	
	//const  mysqlLikeMongo = require("@mihajlomilojevic/mysql-like-mongo");
	
	const { Grupa, Smer } = require("../../models");

	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const grupe = await Grupa.find({});
		const smerovi = await Smer.query(
			`SELECT s.id_smera, s.naziv AS naziv, g.naziv AS grupa, g.id_grupe AS id_grupe ` +
			`FROM smerovi s JOIN grupe g USING(id_grupe)` 
		);
		const props = {
			grupe: serialize(grupe),
			smerovi: serialize(smerovi)
		};
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
