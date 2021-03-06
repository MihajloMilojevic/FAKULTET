import {Smer} from "../models"

async function sviSmerovi() {
	const res = await Smer.query(
		`SELECT s.id_smera, s.naziv AS naziv, g.naziv AS grupa, g.id_grupe AS id_grupe ` +
		`FROM smerovi s JOIN grupe g USING(id_grupe)` 
	)
	return res;
}

async function deleteMany(ids) {
	const res = await Smer.findAndDelete({id_smera: [true, ids]})
	return res;
}

export {sviSmerovi, deleteMany}