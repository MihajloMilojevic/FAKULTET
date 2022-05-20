// CREATE TABLE predmeti(
// 	id_predmeta INT AUTO_INCREMENT PRIMARY KEY,
// 	naziv VARCHAR(50) NOT NULL,
// 	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera),
// 	id_profesora NUMERIC NOT NULL REFERENCES profesori(id_profesora),
// 	nedeljni_fond NUMERIC NOT NULL
// );

import model from "./createModel"

const schema = {
	id_predmeta: {
		primary: true,
		auto: true
	},
	naziv: {
		default: ""
	},
	id_smera: {
		mutable: false,
	},
	id_profesora: {
		mutable: false,
	},
	nedeljni_fond: {
		default: 0
	}
}

const Predmet = model("predmeti", schema);

export default Predmet;
