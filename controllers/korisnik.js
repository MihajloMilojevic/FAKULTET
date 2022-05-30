const Errors = require("../errors");
import { Admin, Korisnik, Profesor, Student } from "../models";

async function login({mejl, lozinka}) {
	let {error, data} = await Korisnik.find({mejl});
	if(error || data.length === 0)
		throw new Errors.UnauthenticatedError("Korisnik ne postoji");
	const korisnik = data[0];
	const tacnaLozinka = await korisnik.uporediLozinku(lozinka);
	if(!tacnaLozinka)
		throw new Errors.UnauthenticatedError("Pogresna lozinka");
	return korisnik;
}

async function podaci(mejl) {
	var {data, error} = await Korisnik.find({mejl});
	let korisnik = data[0];
	let odgovor = null;
	switch(korisnik.uloga) {
		case "admin":
			var {data, error} = await Admin.find({id_admina: korisnik.id_admina});
			if(error)
				throw error;
			odgovor = data[0];
			break;
		case "profesor":
			var {data, error} = await Profesor.find({id_profesora: korisnik.id_profesora});
			if(error)
				throw error;
			odgovor = data[0];
			break;
		case "student":
			var {data, error} = await Student.find({broj_indeksa: korisnik.broj_indeksa});
			if(error)
				throw error;
			odgovor = data[0];
			break;
	}
	return odgovor;
}

export {login, podaci}