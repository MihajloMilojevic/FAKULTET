import Auth from "../middleware/authentication";
import Authorize from "../middleware/authorize";
import { Grad } from "../models";

import { DataGrid } from '@mui/x-data-grid';
import { serialize } from "../utils";

export default function Gradovi({gradovi}) {
	const zaglavlje = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'naziv', headerName: 'NAZIV'}
	];
	console.log(gradovi);
	return (
		<div style={{ display: 'flex', height: '100%', minHeight: 200 }}>
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
