// CREATE TABLE profesori(
// 	id_profesora INT AUTO_INCREMENT PRIMARY KEY,
// 	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
// 	ime VARCHAR(50) NOT NULL,
// 	prezime VARCHAR(50) NOT NULL,
// 	mejl VARCHAR(50) NOT NULL UNIQUE,
// 	adresa VARCHAR(100) NOT NULL,
// 	telefon VARCHAR(20) NOT NULL,
// 	plata NUMERIC NOT NULL
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	id_profesora: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		primary: true,
		auto: true
	},
	jmbg: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	ime: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	prezime: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	mejl: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	adresa: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	telefon: {
		type: mysqlLikeMongo.DataTypes.STRING,
		default: ""
	},
	plata: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		default: 0
	},
})

const Profesor = mysqlLikeMongo.Model("profesori", schema);

export default Profesor;
