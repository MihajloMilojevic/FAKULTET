// CREATE TABLE ispiti(
// 	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
// 	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
// 	ocena NUMERIC NOT NULL CHECK (ocena BETWEEN 5 AND 10),
//	datum DATETIME NOT NULL,
// 	PRIMARY KEY (id_predmeta, broj_indeksa)
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_ispita: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		auto: true
	},
	id_predmeta: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false
	},
	datum: {
		type: mysqlLikeMongo.DataTypes.DATETIME,
		default: () => new Date()
	}
})

const Ispiti = mysqlLikeMongo.Model("ispiti", schema);

export default Ispiti;