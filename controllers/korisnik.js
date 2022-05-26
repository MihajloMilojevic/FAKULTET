const Errors = require("../errors");
import { Korisnik } from "../models";
import bcrypt from "bcryptjs"

async function login({mejl, lozinka}) {
	let {error, data} = await Korisnik.find({mejl});
	console.log({error, data});
	if(error || data.length === 0)
		throw new Errors.UnauthenticatedError("Korisnik ne postoji");
	const korisnik = data[0];
	const tacnaLozinka = await korisnik.uporediLozinku(lozinka);
	console.log(tacnaLozinka);
	if(!tacnaLozinka)
		throw new Errors.UnauthenticatedError("Pogresna lozinka");
	return korisnik;
}

export {login}