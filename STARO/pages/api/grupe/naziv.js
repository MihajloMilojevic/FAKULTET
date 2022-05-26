import Grupa from "../../../DATABASE/models/grupa";

export default async function Fun(req, res) {
	const {error, data} = await Grupa.find({naziv: req.query.naziv});
	res.json(error || JSON.stringify(data));
}