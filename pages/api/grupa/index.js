import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sveGrupe } from "../../../controllers/grupe";
import { Grupa } from "../../../models"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const {data, error} = await sveGrupe()
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, grupe: data});
		}
		case "POST":{
			const {naziv} = req.body;
			if(!naziv)
				throw new Errors.BadRequestError("Naziv grupe je obavezan");
			const {data, error} = await Grupa.create({naziv});
			if(error)
				throw error;
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/grupe ne postoji`);
	}
}

export default errorWrapper(Resolver);