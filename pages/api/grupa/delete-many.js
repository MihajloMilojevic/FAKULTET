import Errors from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { deleteMany } from "../../../controllers/grupe";

async function Resolver(req, res) {
	switch (req.method) {
		case "DELETE":
			if(!req.body.ids)
				throw new Errors.BadRequestError("Idjevi za brisanje su obavezni");
			const {data, error} = await deleteMany(req.body.ids);
			if(error)
				throw error;
			return res.status(StatusCodes.OK).json({ok: true, result: data});
		default:
			throw new Errors.NotFoundError(`${req.method} /api/grupe/delete-many ne postoji`);
	}
}

export default errorWrapper(Resolver);