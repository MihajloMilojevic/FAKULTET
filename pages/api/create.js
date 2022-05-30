import Errors from "../../errors";
import {login} from "../../controllers/korisnik";
import {setCookies} from "../../utils";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";
import { Korisnik, Admin } from "../../models";

async function Resolver(req, res) {
	const admin = new Admin({
        jmbg: "0505008780021",
        ime: "Djordje",
        prezime: "Milojevic",
        mejl: "djordjhjemilojevic@gmail.com",
        adresa: "8. mart 70",
        telefon: "0649781191"
    });
    // await admin.hash();
    const result = await admin.insert();
    res.json(admin)
}
export default errorWrapper(Resolver);