import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviGradovi, deleteMany } from "../../../controllers/gradovi";
import { Grad } from "../../../models"
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			
			const {data, error} = await sviGradovi()
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, gradovi: data});
		}
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			const {id_grada, naziv} = req.body;
			if(!id_grada)
				throw new Errors.BadRequestError("Id grada je obavezan");
			if(!naziv)
				throw new Errors.BadRequestError("Naziv grada je obavezan");
			const {data, error} = await Grad.create({id_grada, naziv});
			if(error)
				throw error;
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		case "DELETE": {
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			if(!req.body.ids)
				throw new Errors.BadRequestError("Idjevi za brisanje su obavezni");
			const {data, error} = await deleteMany(req.body.ids);
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/gradovi ne postoji`);
	}
}

export default errorWrapper(Resolver);