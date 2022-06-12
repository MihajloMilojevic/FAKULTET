import Errors, { CustomAPIError } from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviPredmeti, deleteMany } from "../../../controllers/predmeti";
import { Predmet, Zavisnost } from "../../../models";
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"
import {podaci} from "../../../controllers/korisnik";

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const user = await Auth(req, res);
			await Authorize(user, ["student"]);
			const korisnik = await podaci(user.mejl)
			const data = await Predmet.query(
				`SELECT p.id_predmeta, p.naziv, p.id_smera, p.id_profesora ` +
				`FROM predmeti p JOIN slusanja s USING(id_predmeta) ` +
				`WHERE s.broj_indeksa = '${korisnik.broj_indeksa}'`
			)
			return res.status(StatusCodes.OK).json({ok: true, predmeti: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/predmeti/slusa ne postoji`);
	}
}

export default errorWrapper(Resolver);