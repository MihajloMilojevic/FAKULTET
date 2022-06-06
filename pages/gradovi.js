import Auth from "../middleware/authentication";
import Authorize from "../middleware/authorize";
import { Grad } from "../models";

import { DataGrid } from '@mui/x-data-grid';
import { serialize } from "../utils";
import useFetch from "../hooks/useFetch";
import { useState, useRef } from "react";

export default function Gradovi({gradovi}) {

	const [selectionModel, setSelectionModel] = useState([]);
	const [listaGradova, setListaGradova] = useState(gradovi);

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV'}
	];

	async function Delete() {
		try {
			let res = await fetch("/api/gradovi/delete-many", {
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE",
				body: JSON.stringify({ids: selectionModel})
			})
			let data = await res.json();
			if(!data.ok)
				throw new Error("Došlo je do greške pri brisanju");
			res = await fetch("/api/gradovi");
			data = await res.json();
			if(!data.ok)
				throw new Error("Došlo je do greške pri učitavanju nove liste gradova");
			setListaGradova(data.gradovi);
			alert("Uspesno obrisano");
		}
		catch(error) {
			alert(error.message);
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection:"column", height: '100%', minHeight: 200 }}>
			<button
				onClick={Delete}
			>
			  OBRIŠI
			</button>
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
		</div>
	  );
}

export async function getServerSideProps({req, res}) {
	try {
		const user = await Auth(req, res);
		await Authorize(user, ["admin"]);
		const {data, error} = await Grad.find({});
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
