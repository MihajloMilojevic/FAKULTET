// CREATE TABLE ispiti(
// 	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
// 	ocena NUMERIC NOT NULL CHECK (ocena BETWEEN 5 AND 10),
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
	},
	ocena: {
		default: 5
	}
}

const Ispiti = model("ispiti", schema);

export default Ispiti;