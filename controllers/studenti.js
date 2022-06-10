import {Student} from "../models"

async function sviStudenti() {
	const {data, error} = await Student.query(
		"SELECT S.broj_indeksa, s.ime, s.prezime, s.mejl, g.naziv grad, sm.naziv smer " +
		"FROM studenti s JOIN gradovi g USING(id_grada) JOIN smerovi sm USING(id_smera)"
	);
	return {data, error};
}

async function deleteMany(ids) {
	const res = await Student.findAndDelete({broj_indeksa: [true, ids]})
	return res;
}

export {sviStudenti, deleteMany}