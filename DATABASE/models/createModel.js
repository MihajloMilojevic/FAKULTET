import DB from "../connection";

function Where(filter) {
	function Type(value) {
		if(typeof value === "string")
			return `'${value}'`;
		return value
	}
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

export default function Model(tableName, schema) {
	let mutableFields = [];
	let allFields = [];
	let autoFields = [];
	let primaryKeys = [];
	const _ = function(params) {
		for(let key in schema) {
			this[key] = null;
			if(schema[key].hasOwnProperty("auto") && schema[key].auto)
				autoFields.push(key);
			else
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
	_.prototype = {
		insert: async function() {
				try {
					const result = await DB.query(
						`
							INSERT INTO ${tableName}(${mutableFields.join(", ")}) 
							VALUES(${mutableFields.map(() => "?").join(", ")})
						`,
						mutableFields.map(key => this[key])
					)
					for(let key in autoFields)
						this[key] = result.insertId
					return result.affectedRows != 0;
				} catch (error) {
					return false
				}
			},
		update: async function() {
				try {
					const result = await DB.query(
						`
							UPDATE ${tableName}
							SET ${allFields.map(key => `${key}} = ?`).join(" , ")}
							WHERE ${primaryKeys.map(key => `${key} = ?`).join(" AND ")}
						`,
						[
							...allFields.map(key => this[key]),
							...primaryKeys.map(key => this[key])
						]
					)
					return result.affectedRows != 0;
				} catch (error) {
					return false
				}
			},
		delete: async function() {
				try {
					const result = await DB.query(
						`
							DELETE FROM ${tableName}
							WHERE ${primaryKeys.map(key => `${key} = ?`).join(" AND ")}
						`,
							primaryKeys.map(key => this[key])
					)
					return result.affectedRows != 0;
				} catch (error) {
					return false
				}
			},
	}
	_.find = async (filter) => {
		const query = Where(filter);
		try {
			const result = await DB.query(
				` SELECT * FROM ${tableName} ` + 
				`WHERE ${query !== "" ?  query: 1}`
			)
			const all = result.map((item => (new _(item))))
			return {error: null, data: all}
		} catch (error) {
			return {error, data: null};
		}
	}
	_.findAndUpdate = async (filter, changes) => {}
	return _
}

// schema treba da bude objekat ciji je svaki atribut ime kolone u bazi
// svaki atribut može da ima default vrednost	