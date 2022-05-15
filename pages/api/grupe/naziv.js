import Grupa from "../../../DATABASE/models/grupa";

export default async function Fun(req, res) {
	const {error, data} = await Grupa.findByNaziv(req.query.naziv);
	res.json(error || JSON.stringify(data));
}