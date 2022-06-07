import Auth from "../middleware/authentication";
import Authorize from "../middleware/authorize";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { serialize } from "../utils";
import { useState, useRef } from "react";

// https://codesandbox.io/s/skp0x7?file=/demo.js 

export default function Smerovi({smerovi, grupe}) {

	console.log({smerovi, grupe});
	const [selectionModel, setSelectionModel] = useState([]);
	const [listaGrupa, setListaGrupa] = useState(smerovi);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createGrupaFormData, setCreateDialogFormData] = useState({
		naziv: "",
		id_grupe: ""
	})

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv_smera', headerName: 'NAZIV SMERA', flex: 1},
		{ field: 'naziv_grupe', headerName: 'NAZIV GRUPE', flex: 1}
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
			let res = await fetch("/api/grupa/delete-many", {
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
			id_grupe: "",
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
					id: el.id_smera, 
					naziv_smera: el.naziv_smera,
					naziv_grupe: el.naziv_grupe
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
	
	//const  mysqlLikeMongo = require("@mihajlomilojevic/mysql-like-mongo");
	
	const { Grupa, Smer } = require("../models");

	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const {data: grupe} = await Grupa.find({});
		const {data: smerovi} = await Smer.query(
			`SELECT s.id_smera, s.naziv AS naziv_smera, g.naziv AS naziv_grupe ` +
			`FROM smerovi s JOIN grupe g USING(id_grupe)` 
		)
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
