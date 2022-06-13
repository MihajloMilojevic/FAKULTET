import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { Ispit } from "../../../models"
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin", "profesor"]);
			const {id_predmeta, datum} = req.body;
			if(!id_predmeta)
				throw new Errors.BadRequestError("Id predmeta je obavezan");
			if(!datum)
				throw new Errors.BadRequestError("Datum ispita je obavezan");
			const data = await Ispit.create([{id_predmeta, datum}]);
			if(data?.affectedRows == 0)
				throw new Error("Ništa nije uneto");
			return res.status(StatusCodes.CREATED).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/ispiti ne postoji`);
	}
}

export default errorWrapper(Resolver);