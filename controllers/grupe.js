import {Grupa} from "../models"

async function sveGrupe() {
	const data = await Grupa.find({});
	return data;
}

async function deleteMany(ids) {
	const res = await Grupa.findAndDelete({id_grupe: [true, ids]})
	return res;
}

export {sveGrupe, deleteMany}