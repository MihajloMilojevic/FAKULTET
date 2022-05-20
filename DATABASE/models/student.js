// broj_indeksa VARCHAR(20) PRIMARY KEY,
// jmbg VARCHAR(13) UNIQUE CHECK (LENGTH(jmbg) = 13),
// ime VARCHAR(50) NOT NULL,
// prezime VARCHAR(50) NOT NULL,
// mejl VARCHAR(50) NOT NULL UNIQUE,
// id_grada NUMERIC NOT NULL REFERENCES gradovi(id_grada),
// id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera)


import model from "./createModel"

const schema = {
	broj_indeksa: {
		primary: true,
		mutable: false
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
	id_grada: {
		mutable: false
	},
	id_smera: {
		mutable: false
	},

}

const Student = model("studenti", schema);

export default Student;

/*
export default class Student {
	constructor({broj_indeksa, jmbg, ime, prezime, mejl, id_grada, id_smera}) {
		this.broj_indeksa = broj_indeksa
		this.jmbg = jmbg
		this.ime = ime
		this.prezime = prezime
		this.mejl = mejl
		this.id_grada = id_grada
		this.id_smera = id_smera
	}
	async insert() {
		try {
			const result = await DB.query(`
				INSERT INTO studenti(broj_indeksa, jmbg, ime, prezime, mejl, id_grada, id_smera)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`,
			[
				this.broj_indeksa,
				this.jmbg,
				this.ime,
				this.prezime,
				this.mejl,
				this.id_grada,
				this.id_smera
			])
			return {result, error: null}
		} catch (error) {
			return {error, result: null}
		}
	}
	static async all() {
		try {
			const result = await DB.query(`
				SELECT * FROM studenti
			`)
			return {result, error: null}
		} catch (error) {
			return {error, result: null}
		}
	}
}
*/