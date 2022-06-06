import Auth from "../middleware/authentication";
import Authorize from "../middleware/authorize";
import { Grad } from "../models";

import { DataGrid } from '@mui/x-data-grid';
import { serialize } from "../utils";

import { useState, useRef } from "react";

export default function Gradovi({gradovi}) {

	const [selectionModel, setSelectionModel] = useState([]);

	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV'}
	];
	return (
		<div style={{ display: 'flex', flexDirection:"column", height: '100%', minHeight: 200 }}>
			<DataGrid
				rows={gradovi.map(el => ({
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
			<button
				onClick={() => {
					console.log(selectionModel)
				}}
			>
			  CHECK
			</button>
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
