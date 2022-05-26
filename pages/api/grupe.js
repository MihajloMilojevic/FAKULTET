import {Grupa} from "../../DATABASE/models";
import Auth from "../../DATABASE/middleware/authentication";
import errorWrapper from "../../DATABASE/middleware/errorWrapper";
async function Fun(req, res) {
	const korisnik = await Auth(req, res);
	const data = await Grupa.find({});
	res.json({...data,korisnik:  req.korisnik} /*|| JSON.stringify(data)*/);
	res.status(500).json({ok: false, message: error.message})
}

export default errorWrapper(Fun);