export default function Model(tableName, schema) {
	const _ = function(params) {
		for(key in schema) {
			this[key] = null;
			if(schema[key].hasOwnProperty("default"))
				this[key] = schema[key].default;
			if(params.hasOwnProperty(key))
				this[key] = params[key];
		}
		this.insert = async () => {}
		this.update = async () => {}
		this.delete = async () => {}
	}
	_.find = async (filter) => {}
	_.findAndUpdate = async (filter, changes) => {}
	return _
}

// schema treba da bude objekat ciji je svaki atribut ime kolone u bazi
// svaki atribut može da ima default vrednost	