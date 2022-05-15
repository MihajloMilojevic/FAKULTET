export default function Model(schema, tableName) {
	const modelFunction = (params) => {
		for(key in schema) {
			// ide se kroz schemu i kreiraju se polja
		}
		this.insert = async () => {}
		this.update = async () => {}
		this.delete = async () => {}
	}
	modelFunction.find = async (filter) => {}
	modelFunction.findAndUpdate = async (filter, changes) => {}
	return modelFunction
}

// schema treba da bude objekat ciji je svaki atribut ime kolone u bazi
// svaki atribut može da ima default vrednost	