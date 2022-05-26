import {Grupa} from "../../models";
import Auth from "../../middleware/authentication";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";

async function Fun(req, res) {
	await Auth(req, res);
	console.log("START");
	//  res.json("GRUPE");
	const data = await Grupa.find({});
	res.status(StatusCodes.OK).json({...data} /*|| JSON.stringify(data)*/);
}

export default errorWrapper(Fun);



// export default function(req, res) {
// 	 res.json("test");
// }