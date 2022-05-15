// CREATE TABLE gradovi(
// 	id_grada NUMERIC PRIMARY KEY,
// 	naziv VARCHAR(50) NOT NULL
// );
import DB from "../connection";

export default class Grad {
	constructor({naziv, id_grada}) {
		this.naziv = naziv;
		this.id_grada = id_grada;
	}
	async insert(){
		try {
			const result = await DB.query(
				`
					INSERT INTO gradovi(naziv) 
					VALUES(?)
				`,
				[
					this.naziv
				]
			)
			this.id_grada = result.insertId
			return result.affectedRows != 0;
		} catch (error) {
			return false
		}
	}
	async update(){
		try {
			const result = await DB.query(
				`
					UPDATE gradovi
					SET naziv = ?
					WHERE id_grada = ?
				`,
				[
					this.naziv,
					this.id_grada
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
					DELETE FROM gradovi
					WHERE id_grada = ?
				`,
				[
					this.id_grada
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
					SELECT * FROM gradovi;
				`
			)
			const all = result.map((grad => (new Grad(grad))))
			return {error: null, data: all}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findById(id) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM gradovi
					WHERE id_grada = ?;
				`,
				[id]
			)
			const res = result.map((grad => (new Grad(grad))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findByName(naziv) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM gradovi
					WHERE naziv = ?;
				`,
				[naziv]
			)
			const res = result.map((grad => (new Grad(grad))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
}