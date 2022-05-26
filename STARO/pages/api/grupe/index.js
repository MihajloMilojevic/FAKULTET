import Grupa from "../../../DATABASE/models/grupa";

export default async function Fun(req, res) {
	const {naziv} = req.query;

	const g = new Grupa({naziv})
	const ins = await g.insert();
	res.json(ins);
}