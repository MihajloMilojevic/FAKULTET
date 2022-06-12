// CREATE TABLE zavisnosti(
// 	id_predmeta_od NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	id_predmeta_ko NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	PRIMARY KEY(id_predmeta_od, id_predmeta_ko)
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_predmeta_od: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		default: 0,
		mutable: false
	},
	id_predmeta_ko: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		default: 0,
		mutable: false
	}
})

const Zavisnost = mysqlLikeMongo.Model("zavisnosti", schema);

export default Zavisnost;