import Grupa from "../../../DATABASE/models/grupa";

export default async function Fun(req, res) {
	const {error, data} = await Grupa.findById(req.query.id);
	res.json(error || JSON.stringify(data));
}