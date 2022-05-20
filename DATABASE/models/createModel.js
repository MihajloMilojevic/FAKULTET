import DB from "../connection";

function Type(value) {
	if(typeof value === "string")
		return `'${value}'`;
	return value
}
function Where(filter) {
	let queries = [];
	for(let key in filter) {
		if(typeof filter[key] === "object") {
			const op = Object.keys(filter[key])[0];
			if(op === "null") {
				if(filter[key][op])
					queries.push(`${key} IS NULL`)
				else
					queries.push(`${key} IS NOT NULL`)
			}
			else
				queries.push(`${key} ${op} ${Type(filter[key][op])}`)
		}
		else {
			queries.push(`${key} = ${Type(filter[key])}`)
		}
	}
	return queries.join(" AND ");
}
function Set(changes) {
	let queries = [];
	for(let key in changes) {
		queries.push(`${key} = ${Type(changes[key])}`);
	}
	return queries.join(" , ");
}

export default function model(tableName, schema) {
	let mutableFields = [];
	let allFields = [];
	let autoFields = [];
	let primaryKeys = [];
	const Model = function(params) {
		for(let key in schema) {
			this[key] = null;
			if(schema[key].hasOwnProperty("auto") && schema[key].auto)
				autoFields.push(key);
			else if((schema[key].hasOwnProperty("mutable") && !schema[key].mutable) || !schema[key].hasOwnProperty("mutable"))
				mutableFields.push(key);
			if(schema[key].hasOwnProperty("primary") && schema[key].primary)
				primaryKeys.push(key);
			allFields.push(key);
			if(schema[key].hasOwnProperty("default"))
				this[key] = schema[key].default;
			if(params.hasOwnProperty(key))
				this[key] = params[key];
		}
		if(primaryKeys.length == 0)
			throw new Error("Schema must contain at least one primary key");
	}
	Model.prototype = {
		insert: async function() {
				try {
					const result = await DB.query(
							`INSERT INTO ${tableName}(${mutableFields.join(", ")}) ` +
							`VALUES(${mutableFields.map(() => "?").join(", ")})`
						,
						mutableFields.map(key => this[key])
					)
					for(let key in autoFields)
						this[key] = result.insertId
					return {error: null, data: result}
				} catch (error) {
					return {error, data: null}
				}
			},
		update: async function() {
				try {
					const result = await DB.query(
							`UPDATE ${tableName} ` +
							`SET ${mutableFields.map(key => `${key}} = ?`).join(" , ")} ` +
							`WHERE ${primaryKeys.map(key => `${key} = ?`).join(" AND ")}`
						,
						[
							...mutableFields.map(key => this[key]),
							...primaryKeys.map(key => this[key])
						]
					)
					return {error: null, data: result}
				} catch (error) {
					return {error, data: null}
				}
			},
		delete: async function() {
				try {
					const result = await DB.query(
							`DELETE FROM ${tableName} ` +
							`WHERE ${primaryKeys.map(key => `${key} = ?`).join(" AND ")}`
						,
							primaryKeys.map(key => this[key])
					)
					return {error: null, data: result}
				} catch (error) {
					return {error, data: null}
				}
			},
	}
	Model.create = async (data) => {
		const newObj = new Model(data);
		const result = await newObj.insert();
		return result;
	}
	Model.find = async (filter) => {
		const where = Where(filter);
		try {
			const result = await DB.query(
				` SELECT * FROM ${tableName} ` + 
				`WHERE ${where !== "" ?  where: 1}`
			)
			const all = result.map((item => (new Model(item))))
			return {error: null, data: all}
		} catch (error) {
			return {error, data: null};
		}
	}
	Model.findAndUpdate = async (filter, changes) => {
		const where = Where(filter);
		const set = Set(changes)
		if(set === "")
			throw new Error("Must have at least one change")
		try {
			const result = await DB.query(
				`UPDATE ${tableName} ` +
				`SET ${set} ` + 
				`WHERE ${where !== "" ? where : 1}`
			)
			return {error: null, data: result}
		} catch (error) {
			return {error, data: null};
		}
	}
	Model.findAndDelete = async (filter) => {
		const where = Where(filter);
		try {
			const result = await DB.query(
				`DELETE FROM ${tableName} ` + 
				`WHERE ${where !== "" ?  where: 1}`
			)
			return {error: null, data: result}
		} catch (error) {
			return {error, data: null};
		}
	}
	return Model
}