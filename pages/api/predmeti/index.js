import Errors, { CustomAPIError } from "../../../errors";
import errorWrapper from "../../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { sviPredmeti, deleteMany } from "../../../controllers/predmeti";
import { Predmet, Zavisnost } from "../../../models";
import Auth from "../../../middleware/authentication"
import Authorize from "../../../middleware/authorize"

async function Resolver(req, res) {
	switch (req.method) {
		case "GET": {
			const data = await sviPredmeti()
			return res.status(StatusCodes.OK).json({ok: true, predmeti: data});
		}
		case "POST":{
			const user = await Auth(req, res);
			await Authorize(user, ["admin"]);
			const {naziv, nedeljni_fond, id_smera, id_profesora} = req.body;
			let zavisi = req.body.zavisi;
			if(!naziv)
				throw new Errors.BadRequestError("Naziv predmeta je obavezan");
			if(!nedeljni_fond)
				throw new Errors.BadRequestError("Nedeljni fond je obavezan je obavezan");
			if(!id_profesora)
				throw new Errors.BadRequestError("Profesor je obavezan");
			if(!id_smera)
				throw new Errors.BadRequestError("Smer je obavezan");
			const predmet = new Predmet({naziv, nedeljni_fond, id_smera, id_profesora})
			let data = await predmet.insert();
			if(data?.affectedRows == 0)
				throw new Error();
			zavisi = zavisi.map(z => ({
				id_predmeta_od: z,
				id_predmeta_ko: predmet.id_predmeta
			}))
			if(zavisi.length != 0) {
				data = await Zavisnost.create(zavisi);
				if(data?.affectedRows == 0)
					throw new Error();
			}
			return res.status(StatusCodes.OK).json({ok: true});
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
			throw new Errors.NotFoundError(`${req.method} /api/predmeti ne postoji`);
	}
}

export default errorWrapper(Resolver);