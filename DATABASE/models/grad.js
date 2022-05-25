// CREATE TABLE gradovi(
// 	id_grada NUMERIC PRIMARY KEY,
// 	naziv VARCHAR(50) NOT NULL
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_grada: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true
	},
	naziv: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	}
})

const Grad = mysqlLikeMongo.Model("gradovi", schema);

export default Grad;