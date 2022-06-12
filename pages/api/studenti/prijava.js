import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviStudenti, deleteMany } from "../../../controllers/studenti";
import { Slusanje } from "../../../models";
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"
import {podaci} from "../../../controllers/korisnik";

async function Resolver(req, res) {
	switch (req.method) {
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["student"])
			const korisnik = await podaci(user.mejl);
			const {id_predmeta} = req.body;
			if(!id_predmeta)
				throw new Errors.BadRequestError("Grad je obavezan");
			const data = await Slusanje.create([{broj_indeksa: korisnik.broj_indeksa, id_predmeta}]);
			if(data?.affectedRows == 0)
				throw new Error();
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/studenti/prijava ne postoji`);
	}
}

export default errorWrapper(Resolver);