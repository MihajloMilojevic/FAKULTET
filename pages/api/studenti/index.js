import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviStudenti, deleteMany } from "../../../controllers/studenti";
import { Student } from "../../../models";
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const data = await sviStudenti()
			return res.status(StatusCodes.OK).json({ok: true, studenti: data});
		}
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			const {broj_indeksa, jmbg, ime, prezime, mejl, id_grada, id_smera} = req.body;
			if(!broj_indeksa)
				throw new Errors.BadRequestError("Broj indeksa je obavezan");
			if(!jmbg)
				throw new Errors.BadRequestError("JMBG je obavezan");
			if(!ime)
				throw new Errors.BadRequestError("Ime je obavezno");
			if(!prezime)
				throw new Errors.BadRequestError("Prezime je obavezno");
			if(!mejl)
				throw new Errors.BadRequestError("Mejl je obavezan");
			if(!id_grada)
				throw new Errors.BadRequestError("Grad je obavezan");
			if(!id_smera)
				throw new Errors.BadRequestError("Smer je obavezan");
			const data = await Student.create([{broj_indeksa, jmbg, ime, prezime, mejl, id_grada, id_smera}]);
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		case "DELETE": {
			var user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			if(!req.body.ids)
				throw new Errors.BadRequestError("Idjevi za brisanje su obavezni");
			const data = await deleteMany(req.body.ids);
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/studenti ne postoji`);
	}
}

export default errorWrapper(Resolver);