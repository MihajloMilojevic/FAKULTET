import {Grad} from "../models"

async function sviGradovi() {
	const {data, error} = await Grad.find({});
	return {data, error};
}

async function deleteMany(ids) {
	const res = await Grad.findAndDelete({id_grada: [true, ids]})
	return res;
}

export {sviGradovi, deleteMany}