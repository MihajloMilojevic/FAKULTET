import Student from "../../../DATABASE/models/student";

export default async function Fun(req, res) {
	const {error, result} = await Student.find({});
	res.json(error || result);
}