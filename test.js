const mysql = require("@mihajlomilojevic/mysql-like-mongo");

mysql.Connect({
    host     : "localhost",
    database : "fakultet",
    user     : "root",
    password : ""
});

  
const test = async () => {
	
	var res = await mysql.connection.query(
		"SELECT p.id_predmeta, p.naziv, s.naziv smer, CONCAT(prof.ime, ' ', prof.prezime) profesor, p.nedeljni_fond " +
		"FROM predmeti p JOIN smerovi s USING(id_smera) JOIN profesori prof USING(id_profesora) "
	)
	for(let i = 0; i < res.length; i++) {
		var zavisi = await mysql.Query(
			"SELECT id_predmeta_od id FROM zavisnosti WHERE id_predmeta_ko = " + res[i].id_predmeta
		);
		res[i].zavisi = zavisi.map(o => o.id);
	}
	console.log(res);

}

// test();

let a = [1,5,9,7,3,4,8,2,6];
console.log(a);
console.time();
// a.sort((x, y) => y - x);
a.sort();
a.reverse();
console.timeLog();
console.log(a);