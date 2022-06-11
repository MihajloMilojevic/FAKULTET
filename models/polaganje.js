// CREATE TABLE ispiti(
// 	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
// 	ocena NUMERIC NOT NULL CHECK (ocena BETWEEN 5 AND 10),
//	datum DATETIME NOT NULL,
// 	PRIMARY KEY (id_predmeta, broj_indeksa)
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_polaganja: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		auto: true,
		mutable: false
	},
	broj_indeksa: {
		type: mysqlLikeMongo.DataTypes.STRING,
		primary: true,
		mutable: false
	},
	id_ispita: {
		type: mysqlLikeMongo.DataTypes.INTEGER
	},
	ocena: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		default: 5
	},
})

const Polaganje = mysqlLikeMongo.Model("polaganje", schema);

export default Polaganje;