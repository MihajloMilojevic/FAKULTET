import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { useState } from "react";

import { serialize } from "../../utils";
import Auth from "../../middleware/authentication";
import Authorize from "../../middleware/authorize";
import { Box } from '@mui/system';

export default function Predmet({predmet, studenti, ispiti}) {
	
	const [listaStudenata, setListaStudenata] = useState(studenti);
	const [listaIspita, setListaIspita] = useState(ispiti);
	const [zakaziIspitDialogOpen, setZakaziIspitDialogOpen] = useState(false);
	const [noviIspitDatum, setNoviIspitDatum] = useState(new Date());
	
	const fetchIspite = async () => {
		try {
			const json = await fetch(`/api/ispiti/predmet/${predmet.id_predmeta}`);
			const data = await json.json();
			if(!data?.ok)
				throw new Error(data.message);
			setListaIspita(data.ispiti);
		} catch (error) {
			alert(error.message)
		}
	}

	const zakaziIspit = async () => {
		try {
			const json = await fetch("/api/ispiti", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id_predmeta: predmet.id_predmeta,
					datum: noviIspitDatum
				})
			})
			const data = await json.json();
			if(!data?.ok)
				throw new Error(data.message)
		} catch (error) {
			alert(error.message)
		}
	}

	const handlePromenaDatuma = (newValue) => {
		setNoviIspitDatum(newValue);
	};

	const handleZakaziIspitDialogClose = () => {
		setZakaziIspitDialogOpen(false);
	};

	const handleZakaziIspitDialogConfirm = async () => {
		console.log(noviIspitDatum);
		setZakaziIspitDialogOpen(false);
	}

	const zaglavljeStudenata = [
		{ field: 'id', headerName: 'INDEKS' },
		{ field: 'ime', headerName: 'IME', flex: 1},
		{ field: 'prezime', headerName: 'PREZIME', flex: 1},
		{ field: 'mejl', headerName: 'MEJL', flex: 1},
		{ field: 'grad', headerName: 'GRAD', flex: 1},
		{ field: 'smer', headerName: 'SMER', flex: 1},
		{ field: 'zavrseno', headerName: 'ZAVRŠENO', flex: 1}
	];

	const zaglavljeIspiti = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'ime', headerName: 'IME', flex: 1},
		{ field: 'prezime', headerName: 'PREZIME', flex: 1},
		{ field: 'mejl', headerName: 'MEJL', flex: 1},
		{ field: 'grad', headerName: 'GRAD', flex: 1},
		{ field: 'smer', headerName: 'SMER', flex: 1},
		{ field: 'zavrseno', headerName: 'ZAVRŠENO', flex: 1}
	];

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<h1>{predmet.naziv}</h1>
			<h3>Studenti</h3>
			<DataGrid
				rows={listaStudenata.map(stud => ({
					...stud,
					id: stud.broj_indeksa
				}))}
				columns={zaglavljeStudenata}
				pageSize={10}
				rowsPerPageOptions={[10]}
				autoHeight
				disableColumnFilter={true}
				disableColumnMenu={true}
				checkboxSelection={false}
				disableSelectionOnClick
			/>
			<h3>Ispiti</h3>
			<Button
				onClick={() => setZakaziIspitDialogOpen(true)}
			>
			  Zakaži novi ispit
			</Button>
			<Dialog open={zakaziIspitDialogOpen}>
					<DialogTitle>Zakaži ispit</DialogTitle>
					<DialogContent>
					<Box marginY={1}>
						<MobileDatePicker
							label="Datum ispita"
							inputFormat="dd.MM.yyyy"
							value={noviIspitDatum}
							onChange={handlePromenaDatuma}
							renderInput={(params) => <TextField {...params} />}
						/>
					</Box>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleZakaziIspitDialogClose}>Odustani</Button>
						<Button onClick={handleZakaziIspitDialogConfirm}>Dodaj</Button>
					</DialogActions>
				</Dialog>
		</LocalizationProvider>
	)
}

export async function getServerSideProps({req, res}) {
	const {Predmet, Student, Ispit} = require("../../models");
	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin", "profesor"]);
		const {id: id_predmeta} = req.query;
		const ispiti = await Ispit.find({id_predmeta});
		const predmet = await Predmet.find({id_predmeta})
		const studenti = await Student.query(
			`SELECT S.broj_indeksa, s.ime, s.prezime, s.mejl, g.naziv grad, sm.naziv smer, sl.zavrseno `+
			`FROM studenti s JOIN gradovi g USING(id_grada) JOIN smerovi sm USING(id_smera) JOIN slusanja sl USING(broj_indeksa) ` +
			`WHERE sl.id_predmeta = '${id_predmeta}'`
		)
		const props = {
			predmet: serialize(predmet[0]),
			studenti: serialize(studenti.map(st => ({...st, zavrseno: !!st.zavrseno ? "DA" : "NE"}))),
			ispiti: serialize(ispiti)
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