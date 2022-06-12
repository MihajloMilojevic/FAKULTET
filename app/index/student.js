import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useState } from 'react';

export default function HomeStudent({korisnik, slusa, predmeti}) {

	const [listaSlusa, setListaSlusa] = useState(slusa);
	const [prijavaDialogOpen, setProjavaDialogOpen] = useState(false);
	const [prijavaId, setPrijavaId] = useState("");
	const handleCreateDialogClose = () => {
		setProjavaDialogOpen(false);
	};
	
	const fetchSlusa = async () => {
		try {
			const res = await fetch("/api/predmeti/slusa");
			const data = await res.json();
			if(!data.ok)
				throw new Error(data.message);
			setListaSlusa(data.predmeti);
		} catch (error) {
			alert(error.message);
		}
	}
	
	const prijava = async () => {
		try {
			const json = await fetch("/api/studenti/prijava", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify({id_predmeta: prijavaId})
			})
			const data = await json.json();
			if(!data?.ok)
				throw new Error(data.message);
		} catch (error) {
			alert(error.message)
		}
	}

	const handleCreateDialogFormDataChange = e => {
		setPrijavaId(e.target.value);
	}


	const handleCreateDialogConfirm = async () => {
		await prijava();
		await fetchSlusa();
		setProjavaDialogOpen(false);
		setPrijavaId("")
	}

	return (
		<>
			<Button
				onClick={() => {setProjavaDialogOpen(true)}}
			>
				PRIJAVI SE
			</Button> <br/>
			<ul>
				{
					listaSlusa.length > 0 ?
					listaSlusa.map((predmet, index) => (<li key={index}>{predmet.naziv}</li>)) : 
					"Prijavite se neki predmet"
				}
			</ul>


			<Dialog open={prijavaDialogOpen}>
				<DialogTitle>Slušaj novi predmet</DialogTitle>
				<DialogContent>
					<Select
						id="odabir-predmeta"
						value={prijavaId}
						label="Predmet"
						name="id_predmeta"
						onChange={handleCreateDialogFormDataChange}
						fullWidth
						margin='dense'
						style={{marginBlock : 30}}
					>
						{
							predmeti
								.filter(predmet => !listaSlusa.find(p => p.id_predmeta == predmet.id_predmeta))
								.map((predmet, id) => (<MenuItem key={`predmet-${id}`} value={predmet.id_predmeta}>{predmet.naziv}</MenuItem>))
						}
					</Select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCreateDialogClose}>Odustani</Button>
					<Button onClick={handleCreateDialogConfirm}>Dodaj</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}