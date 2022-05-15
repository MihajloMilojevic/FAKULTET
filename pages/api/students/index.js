import Student from "../../../DATABASE/models/student";

export default async function Fun(req, res) {
	const {broj_indeksa, jmbg, ime, prezime, mejl, id_grada, id_smera} = req.query;

	const s = new Student({broj_indeksa, jmbg, ime, prezime, mejl, id_grada: parseInt(id_grada), id_smera: parseInt(id_smera)})
	
	const {error, result} = await s.insert();
	res.json(error || result);
}