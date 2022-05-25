// CREATE TABLE predmeti(
// 	id_predmeta INT AUTO_INCREMENT PRIMARY KEY,
// 	naziv VARCHAR(50) NOT NULL,
// 	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera),
// 	id_profesora NUMERIC NOT NULL REFERENCES profesori(id_profesora),
// 	nedeljni_fond NUMERIC NOT NULL
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_predmeta: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		auto: true
	},
	naziv: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	id_smera: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false,
	},
	id_profesora: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false,
	},
	nedeljni_fond: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		default: 0
	}
})

const Predmet = mysqlLikeMongo.Model("predmeti", schema);

export default Predmet;
