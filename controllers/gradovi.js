import {Grad} from "../models"

async function sviGradovi() {
	const res = await Grad.find({});
	return res;
}

async function deleteMany(ids) {
	const res = await Grad.findAndDelete({id_grada: [true, ids]})
	return res;
}

export {sviGradovi, deleteMany}