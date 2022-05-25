// CREATE TABLE smerovi(
// 	id_smera INT AUTO_INCREMENT PRIMARY KEY,
// 	naziv VARCHAR(100) NOT NULL,
// 	id_grupe NUMERIC NOT NULL REFERENCES grupe(id_grupe)
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_smera: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		auto: true
	},
	naziv: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	id_grupe: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		default: 0,
		mutable: false
	}
})

const Smer = mysqlLikeMongo.Model("smerovi", schema);

export default Smer;