import Auth from "../middleware/authentication";
import Authorize from "../middleware/authorize";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import { serialize } from "../utils";
import { useState } from "react";

// https://codesandbox.io/s/skp0x7?file=/demo.js 

export default function Predmeti({predmeti, smerovi, profesori}) {

	const [selectionModel, setSelectionModel] = useState([]);
	const [listaPredmeta, setListaPredmeta] = useState(predmeti);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createDialogFormData, setCreateDialogFormData] = useState({
		naziv: "",
		nedeljni_fond: "",
		id_smera: "",
		id_profesora: "",
		zavisi: []
	})

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV', flex: 1},
		{ field: 'smer', headerName: 'SMER', flex: 1},
		{ field: 'profesor', headerName: 'PROFESOR', flex: 1},
		{ field: 'nedeljni_fond', headerName: 'FOND', flex: 1},
		{ field: 'zavisi', headerName: 'ZAVISI', flex: 1}
		
	];

	async function fetchPredmet() {
		try {
			const res = await fetch("/api/predmeti");
			const data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			setListaPredmeta(data.predmeti);
		} catch (error) {
			alert(error.message);
		}
	}
	async function Delete() {
		try {
			let res = await fetch("/api/predmeti", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE",
				body: JSON.stringify({ids: selectionModel})
			})
			let data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			await fetchPredmet();
			alert("Uspesno obrisano");
		}
		catch(error) {
			alert(error.message);
		}
	}

	async function createPredmet(data) {
		try {
			const json = await fetch("/api/predmeti", {
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
		await createPredmet(createDialogFormData);
		await fetchPredmet();
		setCreateDialogOpen(false);
		setCreateDialogFormData({
			naziv: "",
			nedeljni_fond: "",
			id_smera: "",
			id_profesora: "",
			zavisi: []
		})
	}

	return (
		<div>
			<h1>Predmeti</h1>
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
				rows={listaPredmeta.map(el => ({
					...el,
					id: el.id_predmeta,
					zavisi: el.zavisi.map(z => z.naziv).join(", ") || "-"
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
				<DialogTitle>Dodaj predmet</DialogTitle>
				<DialogContent>
					<TextField
					name="naziv"
					margin="dense"
					id="naziv"
					label="Naziv predmeta"
					type="text"
					fullWidth
					multiline
					variant="standard"
					value={createDialogFormData.naziv}
					onChange={handleCreateDialogFormDataChange}
					/>
					<TextField
					name="nedeljni_fond"
					margin="dense"
					id="nedeljni_fond"
					label=" Nedeljni fond"
					type="text"
					fullWidth
					multiline
					variant="standard"
					value={createDialogFormData.nedeljni_fond}
					onChange={handleCreateDialogFormDataChange}
					/>
					<Select
						id="odabir-smera"
						value={createDialogFormData.id_smera}
						label="Smer"
						name="id_smera"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
					>
						{
							smerovi.map((smer, id) => (<MenuItem key={`smerovi-${id}`} value={smer.id_smera}>{smer.naziv}</MenuItem>))
						}
					</Select>
					<Select
						id="odabir-profesora"
						value={createDialogFormData.id_profesora}
						label="Profesor"
						name="id_profesora"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
					>
						{
							profesori.map((prof, id) => (<MenuItem key={`profesori-${id}`} value={prof.id_profesora}>{prof.ime}</MenuItem>))
						}
					</Select>
					<Select
						id="odabir-zavisi"
						value={createDialogFormData.zavisi}
						label="Zavisi"
						name="zavisi"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
						multiple
						disabled={!createDialogFormData.id_smera}
						renderValue={(selected) => (
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{selected.map((value) => (
									<Chip key={value} label={predmeti.find(el => el.id_predmeta == value).naziv} />
								))}
							</Box>
						)}
					>
						{
							predmeti
								.filter(predmet => predmet.id_smera == createDialogFormData.id_smera)
								.map((predmet, id) => (<MenuItem key={`predmeti-${id}`} value={predmet.id_predmeta}>{predmet.naziv}</MenuItem>))
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
	
	const { Profesor, Smer } = require("../models");
	const {sviPredmeti} = require("../controllers/predmeti");

	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const smerovi = await Smer.find({})
		const profesori = await Profesor.find({});
		const predmeti = await sviPredmeti()
		const props = {
			profesori: serialize(profesori.map(prof => ({
				id_profesora: prof.id_profesora,
				ime: prof.ime + " " + prof.prezime
			}))),
			smerovi: serialize(smerovi),
			predmeti: serialize(predmeti)
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
