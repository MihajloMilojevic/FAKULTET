// CREATE TABLE profesori(
// 	id_profesora INT AUTO_INCREMENT PRIMARY KEY,
// 	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
// 	ime VARCHAR(50) NOT NULL,
// 	prezime VARCHAR(50) NOT NULL,
// 	mejl VARCHAR(50) NOT NULL UNIQUE,
// 	adresa VARCHAR(100) NOT NULL,
// 	telefon VARCHAR(20) NOT NULL,
// 	plata NUMERIC NOT NULL
// );

import model from "./createModel"

const schema = {
	id_profesora: {
		primary: true,
		auto: true
	},
	jmbg: {
		default: ""
	},
	ime: {
		default: ""
	},
	prezime: {
		default: ""
	},
	mejl: {
		default: ""
	},
	adresa: {
		default: ""
	},
	telefon: {
		default: ""
	},
	plata: {
		default: 0
	},
}

const Profesor = model("profesori", schema);

export default Profesor;
