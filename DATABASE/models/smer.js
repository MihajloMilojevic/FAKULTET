// CREATE TABLE smerovi(
// 	id_smera INT AUTO_INCREMENT PRIMARY KEY,
// 	naziv VARCHAR(100) NOT NULL,
// 	id_grupe NUMERIC NOT NULL REFERENCES grupe(id_grupe)
// );

import model from "./createModel"

const schema = {
	id_smera: {
		primary: true,
		auto: true
	},
	naziv: {
		default: ""
	},
	id_grupe: {
		default: 0,
		mutable: false
	}
}

const Smer = model("smerovi", schema);

export default Smer;

/*
export default class Smer {
	constructor({naziv, id_smera, id_grupe}) {
		this.naziv = naziv;
		this.id_smera = id_smera;
		this.id_grupe = id_grupe;
	}
	async insert(){
		try {
			const result = await DB.query(
				`
					INSERT INTO smerovi(naziv, id_grupe) 
					VALUES(?, ?)
				`,
				[
					this.naziv,
					this.id_grupe
				]
			)
			this.id_smera = result.insertId
			return result.affectedRows != 0;
		} catch (error) {
			return false
		}
	}
	async update(){
		try {
			const result = await DB.query(
				`
					UPDATE smerovi
					SET naziv = ?
					WHERE id_smera = ?
				`,
				[
					this.naziv,
					this.id_smera
				]
			)
			return result.affectedRows != 0;
		} catch (error) {
			return false
		}
	}
	async delete(){
		try {
			const result = await DB.query(
				`
					DELETE FROM smerovi
					WHERE id_smera = ?
				`,
				[
					this.id_smera
				]
			)
			return result.affectedRows != 0;
		} catch (error) {
			return false
		}
	}
	static async all(){
		try {
			const result = await DB.query(
				`
					SELECT * FROM smerovi;
				`
			)
			const all = result.map((smer => (new Smer(smer))))
			return {error: null, data: all}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findById(id) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM smerovi
					WHERE id_smera = ?;
				`,
				[id]
			)
			const res = result.map((smer => (new Smer(smer))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findByName(naziv) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM smerovi
					WHERE naziv = ?;
				`,
				[naziv]
			)
			const res = result.map((smer => (new Smer(smer))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findByGroup(id_grupe) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM smerovi
					WHERE id_grupe = ?;
				`,
				[id_grupe]
			)
			const res = result.map((smer => (new Smer(smer))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
}
*/