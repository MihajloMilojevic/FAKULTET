import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviGradovi } from "../../../controllers/gradovi";
import { Grad } from "../../../models"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			
			const {data, error} = await sviGradovi()
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, gradovi: data});
		}
		case "POST":{
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
		default:
			throw new Errors.NotFoundError(`${req.method} /api/gradovi ne postoji`);
	}
}

export default errorWrapper(Resolver);