import {Admin, Grad, Grupa} from "../../models";
import Auth from "../../middleware/authentication";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import {sviStudenti} from "../../controllers/studenti"

async function Fun(req, res) {
	// await Auth(req, res);
	// console.log("START");
	//  res.json("GRUPE");
	const data = await Grad.create([
		{id_grada: 1, naziv: "GR1"},
		{id_grada: 2, naziv: "GR2"},
		{id_grada: 3, naziv: "GR3"},
		{id_grada: 4, naziv: "GR4"},
		{id_grada: 5, naziv: "GR5"}
	]);
	res.status(StatusCodes.OK).json(data);
}

export default errorWrapper(Fun);



// export default function(req, res) {
// 	 res.json("test");
// }