

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { serialize } from "../utils";
import { useState } from "react";

export default function Studenti({studenti, gradovi, smerovi}) {
	const [selectionModel, setSelectionModel] = useState([]);
	const [listaStudenata, setListaStudenata] = useState(studenti);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createDialogFormData, setCreateDialogFormData] = useState({
		jmbg: "",
		ime: "",
		prezime: "",
		mejl: "",
		id_grada: "",
		id_smera: ""
	})

	const zaglavlje = [
		{ field: 'id', headerName: 'INDEKS' },
		{ field: 'ime', headerName: 'IME', flex: 1},
		{ field: 'prezime', headerName: 'PREZIME', flex: 1},
		{ field: 'mejl', headerName: 'MEJL', flex: 1},
		{ field: 'grad', headerName: 'GRAD', flex: 1},
		{ field: 'smer', headerName: 'SMER', flex: 1}
	];

	async function fetchGrupe() {
		try {
			const res = await fetch("/api/profesori");
			const data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			setListaStudenata(data.profesori);
		} catch (error) {
			alert(error.message);
		}
	}
	async function Delete() {
		try {
			let res = await fetch("/api/profesori", {
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
			const json = await fetch("/api/profesori", {
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
		console.log(createDialogFormData);
		return;
		await createGrupa(createDialogFormData);
		await fetchGrupe();
		setCreateDialogOpen(false);
		setCreateDialogFormData({
			jmbg: "",
			ime: "",
			prezime: "",
			mejl: "",
			id_grada: "",
			id_smera: ""
		})
	}

	return (
		<div>
			<h1>Studenti</h1>
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
				rows={listaStudenata.map(stud => ({
					...stud,
					id: stud.broj_indeksa
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
				<DialogTitle>Dodaj profesora</DialogTitle>
				<DialogContent>
					<TextField
					name="jmbg"
					margin="dense"
					id="jmbg"
					label="JMBG"
					type="text"
					fullWidth
					variant="standard"
					value={createDialogFormData.jmbg}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="ime"
					margin="dense"
					id="ime"
					label="Ime"
					type="text"
					fullWidth
					variant="standard"
					value={createDialogFormData.ime}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="prezime"
					margin="dense"
					id="prezime"
					label="Prezime"
					type="text"
					fullWidth
					variant="standard"
					value={createDialogFormData.prezime}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="mejl"
					margin="dense"
					id="mejl"
					label="Mejl"
					type="text"
					fullWidth
					variant="standard"
					value={createDialogFormData.mejl}
					onChange={handleCreateDialogFormDataChange}
					/>
					<Select
						id="odabir-grada"
						value={createDialogFormData.id_grada}
						label="Grad"
						name="id_grada"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
						margin='dense'
						style={{marginBlock : 30}}
					>
						{
							gradovi.map((grad, id) => (<MenuItem key={`grad-${id}`} value={grad.id_grada}>{grad.naziv}</MenuItem>))
						}
					</Select>
					<Select
						id="odabir-smera"
						value={createDialogFormData.id_smera}
						label="Smer"
						name="id_smera"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
					>
						{
							smerovi.map((smer, id) => (<MenuItem key={`smer-${id}`} value={smer.id_smera}>{smer.naziv}</MenuItem>))
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
	try {
		const {Grad, Smer} = require("../models");
		const Auth = require("../middleware/authentication");
		const Authorize = require("../middleware/authorize");
		const {sviStudenti} = require("../controllers/studenti")
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const studenti = await sviStudenti();
		const gradovi = await Grad.find({});
		const smerovi = await Smer.find({});
		const props = {
			studenti: serialize(studenti), 
			gradovi: serialize(gradovi), 
			smerovi: serialize(smerovi)
		};
		return {props};
	} catch (error) {
		console.error(error);
		return {
			redirect: {
				permanent: false,
				destination: "/",
			  },
			  props:{},
		}
	}
}
