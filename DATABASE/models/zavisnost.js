// CREATE TABLE zavisnosti(
// 	id_predmeta_od NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	id_predmeta_ko NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	PRIMARY KEY(id_predmeta_od, id_predmeta_ko)
// );

import model from "./createModel"

const schema = {
	id_predmeta_od: {
		primary: true,
		default: 0,
		mutable: false
	},
	id_predmeta_do: {
		primary: true,
		default: 0,
		mutable: false
	}
}

const Zavisnost = model("zavisnosti", schema);

export default Zavisnost;