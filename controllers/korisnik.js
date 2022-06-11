const Errors = require("../errors");
import { Admin, Korisnik, Profesor, Student } from "../models";

async function login({mejl, lozinka}) {
	let data = await Korisnik.find({mejl});
	if(data.length === 0)
		throw new Errors.UnauthenticatedError("Korisnik ne postoji");
	const korisnik = data[0];
	const tacnaLozinka = await korisnik.uporediLozinku(lozinka);
	if(!tacnaLozinka)
		throw new Errors.UnauthenticatedError("Pogresna lozinka");
	return korisnik;
}

async function podaci(mejl) {
	var data = await Korisnik.find({mejl});
	let korisnik = data[0];
	let odgovor = null;
	switch(korisnik.uloga) {
		case "admin":
			var data = await Admin.find({id_admina: korisnik.id_admina});
			odgovor = data[0];
			break;
		case "profesor":
			var data = await Profesor.find({id_profesora: korisnik.id_profesora});
			odgovor = data[0];
			break;
		case "student":
			var data = await Student.find({broj_indeksa: korisnik.broj_indeksa});
			odgovor = data[0];
			break;
	}
	return odgovor;
}

export {login, podaci}