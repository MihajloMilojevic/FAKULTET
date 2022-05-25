// CREATE TABLE IF NOT EXISTS korisnici(
// 	mejl VARCHAR(70) NOT NULL PRIMARY KEY,
// 	lozinka VARCHAR(50) NOT NULL,
// 	uloga VARCHAR(50) NOT NULL CHECK (uloga IN('admin', 'profesor', 'student')),
// 	id_profesora INT REFERENCES	profesori(id_profesora0),
// 	broj_indeksa VARCHAR(20) REFERENCES studenti(broj_indeksa),
// 	id_admina INT REFERENCES admini(id_admina),
// 	CHECK ((id_profesora IS NULL AND broj_indeksa IS NULL AND id_admina IS NOT NULL AND uloga = 'admin') OR
// 		  (id_profesora IS NULL AND broj_indeksa IS NOT NULL AND id_admina IS NULL AND uloga = 'student') OR
// 		  (id_profesora IS NOT NULL AND broj_indeksa IS NULL AND id_admina IS NULL AND uloga = 'profesor'))
// );

import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo";
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const schema = mysqlLikeMongo.Schema({
	mejl: {
		type: mysqlLikeMongo.DataTypes.STRING,
		primary: true
	},
	lozinka: {
		type: mysqlLikeMongo.DataTypes.STRING
	},
	uloga: {
		type: mysqlLikeMongo.DataTypes.STRING,
		mutable: false
	},
	broj_indeksa: {
		type: mysqlLikeMongo.DataTypes.STRING,
		mutable: false
	},
	id_prefesore: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false
	},
	id_admina: {
		type: mysqlLikeMongo.DataTypes.INTEGER,
		mutable: false
	}
})

const Korisnik = mysqlLikeMongo.Model("korisnici", schema);

Korisnik.addMethod("hash", async function(){
	const salt = await bcrypt.genSalt(10)
    this.lozinka = await bcrypt.hash(this.lozinka, salt)
})

Korisnik.addMethod("uporediLozinku", async function(lozinka) {
	const iste = await bcrypt.compare(lozinka, this.lozinka)
    return iste;
})

Korisnik.addMethod("token", function() {
    const sadrzaj = {mejl: this.mejl, uloga: this.uloga}
	return jwt.sign(
		sadrzaj,
		process.env.JWT_SECRET
	)
})

export default Korisnik;