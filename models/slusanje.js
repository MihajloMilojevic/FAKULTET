// CREATE TABLE slusanja(
// 	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
// 	PRIMARY KEY (id_predmeta, broj_indeksa)
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_predmeta: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		mutable: false
	},
	broj_indeksa: {
		type: mysqlLikeMongo.DataTypes.STRING,
		primary: true,
		mutable: false
	},
	zavrseno: {
		type: mysqlLikeMongo.DataTypes.BOOL,
		default: false
	}
})

const Slusanje = mysqlLikeMongo.Model("slusanja", schema);

export default Slusanje;