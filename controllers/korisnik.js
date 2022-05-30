const Errors = require("../errors");
import { Admin, Korisnik, Profesor, Student } from "../models";

async function login({mejl, lozinka}) {
	let {error, data} = await Korisnik.find({mejl});
	console.log({error, data});
	if(error || data.length === 0)
		throw new Errors.UnauthenticatedError("Korisnik ne postoji");
	const korisnik = data[0];
	const tacnaLozinka = await korisnik.uporediLozinku(lozinka);
	if(!tacnaLozinka)
		throw new Errors.UnauthenticatedError("Pogresna lozinka");
	return korisnik;
}

async function podaci(mejl) {
	let {data} = await Korisnik.find({mejl});
	let korisnik = data[0];
	let odgovor = null;
	switch(korisnik.uloga) {
		case "admin":
			odgovor = await Admin.find({id_admina: korisnik.id_admina})[0];
			break;
		case "profesor":
			odgovor = await Profesor.find({id_profesora: korisnik.id_profesora})[0];
			break;
		case "student":
			odgovor = await Student.find({broj_indeksa: korisnik.broj_indeksa})[0];
			break;
	}
	return odgovor;
}

export {login, podaci}