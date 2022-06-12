import {Grad} from "../models"

async function sviGradovi() {
	const res = await Grad.query(
		"SELECT * FROM gradovi ORDER BY naziv"
	);
	return res;
}

async function deleteMany(ids) {
	const res = await Grad.findAndDelete({id_grada: [true, ids]})
	return res;
}

export {sviGradovi, deleteMany}