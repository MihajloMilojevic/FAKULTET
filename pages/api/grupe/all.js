import Grupa from "../../../DATABASE/models/grupa";

export default async function Fun(req, res) {
	const {error, data} = await Grupa.find({});
	res.json(error || JSON.stringify(data));
}