import Student from "../../../DATABASE/models/student";

export default async function Fun(req, res) {
	const {error, result} = await Student.all();
	res.json(error || result);
}