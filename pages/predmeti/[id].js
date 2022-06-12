import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useState } from "react";

import { serialize } from "../../utils";
import Auth from "../../middleware/authentication";
import Authorize from "../../middleware/authorize";

export default function Predmet({predmet, studenti}) {
	
	const [selectionModel, setSelectionModel] = useState([]);
	const [listaStudenata, setListaStudenata] = useState(studenti);

	const zaglavlje = [
		{ field: 'id', headerName: 'INDEKS' },
		{ field: 'ime', headerName: 'IME', flex: 1},
		{ field: 'prezime', headerName: 'PREZIME', flex: 1},
		{ field: 'mejl', headerName: 'MEJL', flex: 1},
		{ field: 'grad', headerName: 'GRAD', flex: 1},
		{ field: 'smer', headerName: 'SMER', flex: 1},
		{ field: 'zavrseno', headerName: 'ZAVRŠENO', flex: 1}
	];
	return (
		<>
		<h1>{predmet.naziv}</h1>
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
		</>
	)
}

export async function getServerSideProps({req, res}) {
	const {Predmet, Student} = require("../../models");
	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin", "profesor"]);
		const {id: id_predmeta} = req.query;
		const predmet = await Predmet.find({id_predmeta})
		const studenti = await Student.query(
			`SELECT S.broj_indeksa, s.ime, s.prezime, s.mejl, g.naziv grad, sm.naziv smer, sl.zavrseno `+
			`FROM studenti s JOIN gradovi g USING(id_grada) JOIN smerovi sm USING(id_smera) JOIN slusanja sl USING(broj_indeksa) ` +
			`WHERE sl.id_predmeta = '${id_predmeta}'`
		)
		const props = {
			predmet: serialize(predmet[0]),
			studenti: serialize(studenti.map(st => ({...st, zavrseno: !!st.zavrseno ? "DA" : "NE"})))
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