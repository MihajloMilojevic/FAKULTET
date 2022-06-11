import {Profesor} from "../models"

async function sviProfesori() {
	const res = await Profesor.find({});
	return res;
}

async function deleteMany(ids) {
	const res = await Profesor.findAndDelete({id_profesora: [true, ids]})
	return res;
}

export {sviProfesori, deleteMany}