// CREATE TABLE slusanja(
// 	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
// 	PRIMARY KEY (id_predmeta, broj_indeksa)
// );

import model from "./createModel"

const schema = {
	id_predmeta: {
		primary: true,
		mutable: false
	},
	broj_indeksa: {
		primary: true,
		mutable: false
	}
}

const Slusanje = model("slusanja", schema);

export default Slusanje;