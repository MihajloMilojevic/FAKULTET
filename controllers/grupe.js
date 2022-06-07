import {Grupa} from "../models"

async function sveGrupe() {
	const {data, error} = await Grupa.find({});
	return {data, error};
}

async function deleteMany(ids) {
	const res = await Grupa.findAndDelete({id_grupe: [true, ids]})
	return res;
}

export {sveGrupe, deleteMany}