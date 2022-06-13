import {Admin, Grad, Grupa, Korisnik} from "../../models";
import Auth from "../../middleware/authentication";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import {sviStudenti} from "../../controllers/studenti"

async function Fun(req, res) {
	const svi = await Korisnik.query(
		"SELECT * FROM korisnici"
	);
	
	res.status(StatusCodes.OK).json(svi);
}

export default errorWrapper(Fun);



// export default function(req, res) {
// 	 res.json("test");
// }