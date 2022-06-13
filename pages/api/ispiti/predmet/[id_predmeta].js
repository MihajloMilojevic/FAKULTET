import Errors from "../../../../errors";
import errorWrapper from "../../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { Ispit } from "../../../../models"
import Auth from "../../../../middleware/authentication"
import Authorize from "../../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin", "profesor"]);
            const {id_predmeta} = req.query;
			const data = await Ispit.find({id_predmeta});
			return res.status(StatusCodes.CREATED).json({ok: true, ispiti: data});
		}
		default:
			throw new Errors.NotFoundError(`${req.method} /api/ispiti/predmet ne postoji`);
	}
}

export default errorWrapper(Resolver);