import Errors from "../../errors";
import {login} from "../../controllers/korisnik";
import {setCookies} from "../../utils";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";

async function Resolver(req, res) {
	switch (req.method) {
		case "POST":
			const {mejl, lozinka} = req.body;
			if(!mejl)
				throw new Errors.BadRequestError("Mejl je obavezan");
			if(!lozinka)
				throw new Errors.BadRequestError("Lozinka je obavezna");
			const korisnik = await login({mejl, lozinka});
			const token = await korisnik.token()
			setCookies(res, [{
				kljuc: "token",
				vrednost: token
			}])
			res.status(StatusCodes.OK).json({ok: true, korisnik})
			break;
		default:
			throw new Errors.NotFoundError(`${req.method} /api/login ne postoji`);
	}
}

export default errorWrapper(Resolver);