// CREATE TABLE grupe(
// 	id_grupe INT AUTO_INCREMENT PRIMARY KEY ,
// 	naziv VARCHAR(100) NOT NULL
// );

import model from "./createModel"

const schema = {
	id_grupe: {
		primary: true,
		auto: true
	},
	naziv: {
		default: ""
	}
}

const Grupa = model("grupe", schema);

export default Grupa;










/*
export default class Grupa {
	constructor({naziv, id_grupe}) {
		this.naziv = naziv;
		this.id_grupe = id_grupe;
	}
	async insert(){
		try {
			const result = await DB.query(
				`
					INSERT INTO grupe(naziv) 
					VALUES(?)
				`,
				[
					this.naziv
				]
			)
			this.id_grupe = result.insertId
			return result.affectedRows != 0;
		} catch (error) {
			return false
		}
	}
	async update(){
		try {
			const result = await DB.query(
				`
					UPDATE ${tableName}
					SET 
					WHERE id_grupe = ?
				`,
				[
					this.naziv,
					this.id_grupe
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
					DELETE FROM grupe
					WHERE id_grupe = ?
				`,
				[
					this.id_grupe
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
					SELECT * FROM grupe;
				`
			)
			const all = result.map((grupa => (new Grupa(grupa))))
			return {error: null, data: all}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findById(id) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM grupe
					WHERE id_grupe = ?;
				`,
				[id]
			)
			const res = result.map((grupa => (new Grupa(grupa))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
	static async findByName(naziv) {
		try {
			const result = await DB.query(
				`
					SELECT * FROM grupe
					WHERE naziv = ?;
				`,
				[naziv]
			)
			const res = result.map((grupa => (new Grupa(grupa))))
			return {error: null, data: res}
		} catch (error) {
			return {error, data: null};
		}
	}
}*/