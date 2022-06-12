import {Admin, Grad, Grupa} from "../../models";
import Auth from "../../middleware/authentication";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import {sviStudenti} from "../../controllers/studenti"

async function Fun(req, res) {
	const svi = await Grad.find({});
	svi.sort((a,b) => (a.naziv > b.naziv) ? 1 : ((b.naziv > a.naziv) ? -1 : 0))
	await Grad.findAndDelete({id_grada: {"<>": 0}});
	let a = await Grad.find({});
	console.log(a)
	await Grad.create(svi);
	res.status(StatusCodes.OK).json(svi);
}

export default errorWrapper(Fun);



// export default function(req, res) {
// 	 res.json("test");
// }