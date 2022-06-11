import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sveGrupe, deleteMany } from "../../../controllers/grupe";
import { Grupa } from "../../../models"
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const data = await sveGrupe()
			return res.status(StatusCodes.OK).json({ok: true, grupe: data});
		}
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			const {naziv} = req.body;
			if(!naziv)
				throw new Errors.BadRequestError("Naziv grupe je obavezan");
			const data = await Grupa.create([{naziv}]);
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		case "DELETE":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			if(!req.body.ids)
				throw new Errors.BadRequestError("Idjevi za brisanje su obavezni");
			const data = await deleteMany(req.body.ids);
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/grupe ne postoji`);
	}
}

export default errorWrapper(Resolver);