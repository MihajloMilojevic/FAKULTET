import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviGradovi } from "../../../controllers/gradovi";

async function Resolver(req, res) {
	switch (req.method) {
		case "GET":
			const {data, error} = await sviGradovi()
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, gradovi: data});
		default:
			throw new Errors.NotFoundError(`${req.method} /api/gradovi ne postoji`);
	}
}

export default errorWrapper(Resolver);