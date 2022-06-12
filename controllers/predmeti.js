import {Predmet, Zavisnost} from "../models"

async function sviPredmeti() {
	var res = await Predmet.query(
		"SELECT p.id_predmeta, p.naziv, p.id_smera, s.naziv smer, CONCAT(prof.ime, ' ', prof.prezime) profesor, p.nedeljni_fond " +
		"FROM predmeti p JOIN smerovi s USING(id_smera) JOIN profesori prof USING(id_profesora) "
	)
	for(let i = 0; i < res.length; i++) {
		var zavisi = await Zavisnost.query(
			"SELECT p.naziv, p.id_predmeta FROM zavisnosti z JOIN predmeti p ON p.id_predmeta = z.id_predmeta_od WHERE z.id_predmeta_ko = " + res[i].id_predmeta
		);
		res[i].zavisi = zavisi;
	}
	return res;
}

async function deleteMany(ids) {
	ids.sort();
	ids.reverse();
	const res = await Predmet.findAndDelete({id_predmeta: [true, ids]})
	return res;
}

export {sviPredmeti, deleteMany}