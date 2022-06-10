

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { serialize } from "../utils";
import { useState } from "react";

export default function Studenti({studenti}) {
	const [selectionModel, setSelectionModel] = useState([]);
	const [listaStudenata, setListaStudenata] = useState(studenti);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createGrupaFormData, setCreateDialogFormData] = useState({
		jmbg: "",
		ime: "",
		prezime: "",
		mejl: "",
		adresa: "",
		telefon: "",
		plata: ""
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
			...createGrupaFormData,
			[e.target.name]: e.target.value
		})
	}

	const handleCreateDialogConfirm = async () => {
		await createGrupa(createGrupaFormData);
		await fetchGrupe();
		setCreateDialogOpen(false);
		setCreateDialogFormData({
			jmbg: "",
			ime: "",
			prezime: "",
			mejl: "",
			adresa: "",
			telefon: "",
			plata: ""
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
					value={createGrupaFormData.jmbg}
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
					value={createGrupaFormData.ime}
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
					value={createGrupaFormData.prezime}
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
					value={createGrupaFormData.mejl}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="adresa"
					margin="dense"
					id="adresa"
					label="Adresa"
					type="text"
					fullWidth
					variant="standard"
					value={createGrupaFormData.adresa}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="telefon"
					margin="dense"
					id="telefon"
					label="Telefon"
					type="text"
					fullWidth
					variant="standard"
					value={createGrupaFormData.telefon}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="plata"
					margin="dense"
					id="plata"
					label="Plata"
					type="text"
					fullWidth
					variant="standard"
					value={createGrupaFormData.plata}
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
		const Auth = require("../middleware/authentication");
		const Authorize = require("../middleware/authorize");
		const {sviStudenti} = require("../controllers/studenti")
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const {data} = await sviStudenti();
		const props = {studenti: serialize(data)};
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
