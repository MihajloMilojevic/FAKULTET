// broj_indeksa VARCHAR(20) PRIMARY KEY,
// jmbg VARCHAR(13) UNIQUE CHECK (LENGTH(jmbg) = 13),
// ime VARCHAR(50) NOT NULL,
// prezime VARCHAR(50) NOT NULL,
// mejl VARCHAR(50) NOT NULL UNIQUE,
// id_grada NUMERIC NOT NULL REFERENCES gradovi(id_grada),
// id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera)


import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

const schema = mysqlLikeMongo.Schema({
	broj_indeksa: {
		type: mysqlLikeMongo.DataTypes.STRING,
		primary: true,
		mutable: false
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
	id_grada: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false
	},
	id_smera: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false
	},

})

const Student = mysqlLikeMongo.Model("studenti", schema);

export default Student;