import DB from "../connection"

import script from "../scripts.json"

const drop = async () => {
	try {
		const res = script.create.map(async sql => await DB.query(sql))
		return res;
	} catch (error) {
		return error
	}
}

export default drop;