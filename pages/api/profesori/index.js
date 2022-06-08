import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviProfesori, deleteMany } from "../../../controllers/profesori";
import { Profesor } from "../../../models";
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const {data, error} = await sviProfesori()
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, profesori: data});
		}
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			const {jmbg, ime, prezime, mejl, adresa, telefon, plata} = req.body;
			if(!jmbg)
				throw new Errors.BadRequestError("JMBG je obavezan");
			if(!ime)
				throw new Errors.BadRequestError("Ime je obavezno");
			if(!prezime)
				throw new Errors.BadRequestError("Prezime je obavezno");
			if(!mejl)
				throw new Errors.BadRequestError("Mejl je obavezan");
			if(!adresa)
				throw new Errors.BadRequestError("Adresa je obavezna");
			if(!telefon)
				throw new Errors.BadRequestError("Telefon je obavezan");
			if(!plata)
				throw new Errors.BadRequestError("Plata je obavezna");
			const {data, error} = await Profesor.create({jmbg, ime, prezime, mejl, adresa, telefon, plata});
			if(error)
				throw error;
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		case "DELETE": {
			var user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			if(!req.body.ids)
				throw new Errors.BadRequestError("Idjevi za brisanje su obavezni");
			const {data, error} = await deleteMany(req.body.ids);
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/profesori ne postoji`);
	}
}

export default errorWrapper(Resolver);