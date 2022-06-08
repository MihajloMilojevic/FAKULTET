import {Profesor} from "../models"

async function sviProfesori() {
	const {data, error} = await Profesor.find({});
	return {data, error};
}

async function deleteMany(ids) {
	const res = await Profesor.findAndDelete({id_profesora: [true, ids]})
	return res;
}

export {sviProfesori, deleteMany}