const Errors = require("../errors");
const StatusCodes = require("http-status-codes");
import { Korisnik } from "../models";
import setCookies from "../utils"

async function login({mejl, lozinka}) {
	let {error, korisnik} = await Korisnik.find({mejl});
	if(error !== null)
		throw new Errors.UnauthenticatedError("Korisnik ne postoji");
	if(!korisnik.uporediLozinku(lozinka))
		throw new Errors.UnauthenticatedError("Pogresna lozinka");
	return korisnik;
}

module.exports = {
	login
}