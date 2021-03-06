import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviSmerovi, deleteMany } from "../../../controllers/smerovi";
import { Smer } from "../../../models";
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const data = await sviSmerovi()
			return res.status(StatusCodes.OK).json({ok: true, smerovi: data});
		}
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			const {naziv, id_grupe} = req.body;
			if(!id_grupe)
				throw new Errors.BadRequestError("Grupa je obavezna");
			if(!naziv)
				throw new Errors.BadRequestError("Naziv smera je obavezan");
			const data = await Smer.create([{id_grupe, naziv}]);
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		case "DELETE": {
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			if(!req.body.ids)
				throw new Errors.BadRequestError("Idjevi za brisanje su obavezni");
			const data = await deleteMany(req.body.ids);
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/smerovi ne postoji`);
	}
}

export default errorWrapper(Resolver);