CREATE DATABASE IF NOT EXISTS fakultet CHARACTER SET UTF8 COLLATE utf8_bin;
USE fakultet;

CREATE TABLE IF NOT EXISTS grupe(
	id_grupe INT AUTO_INCREMENT PRIMARY KEY ,
	naziv VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS smerovi(
	id_smera INT AUTO_INCREMENT PRIMARY KEY,
	naziv VARCHAR(100) NOT NULL,
	id_grupe NUMERIC NOT NULL REFERENCES grupe(id_grupe)
);

CREATE TABLE IF NOT EXISTS gradovi(
	id_grada NUMERIC PRIMARY KEY,
	naziv VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS profesori(
	id_profesora INT AUTO_INCREMENT PRIMARY KEY,
	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
	ime VARCHAR(50) NOT NULL,
	prezime VARCHAR(50) NOT NULL,
	mejl VARCHAR(70) NOT NULL UNIQUE,
	adresa VARCHAR(100) NOT NULL,
	telefon VARCHAR(20) NOT NULL,
	plata NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS studenti(
	broj_indeksa VARCHAR(20) PRIMARY KEY,
	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
	ime VARCHAR(50) NOT NULL,
	prezime VARCHAR(50) NOT NULL,
	mejl VARCHAR(70) NOT NULL UNIQUE,
	id_grada NUMERIC NOT NULL REFERENCES gradovi(id_grada),
	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera)
);

CREATE TABLE IF NOT EXISTS predmeti(
	id_predmeta INT AUTO_INCREMENT PRIMARY KEY,
	naziv VARCHAR(50) NOT NULL,
	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera),
	id_profesora NUMERIC NOT NULL REFERENCES profesori(id_profesora),
	nedeljni_fond NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS zavisnosti(
	id_predmeta_od NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	id_predmeta_ko NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	PRIMARY KEY(id_predmeta_od, id_predmeta_ko)
);

CREATE TABLE IF NOT EXISTS ispiti(
	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
	ocena NUMERIC CHECK (ocena BETWEEN 5 AND 10 OR ocena IS NULL),
	datum DATETIME NOT NULL,
	PRIMARY KEY (id_predmeta, broj_indeksa)
);

CREATE TABLE IF NOT EXISTS slusanja(
	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
	PRIMARY KEY (id_predmeta, broj_indeksa)
);

CREATE TABLE IF NOT EXISTS admini(
	id_admina INT AUTO_INCREMENT PRIMARY KEY,
	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
	ime VARCHAR(50) NOT NULL,
	prezime VARCHAR(50) NOT NULL,
	mejl VARCHAR(70) NOT NULL UNIQUE,
	adresa VARCHAR(100) NOT NULL,
	telefon VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS korisnici(
	mejl VARCHAR(70) NOT NULL PRIMARY KEY,
	lozinka VARCHAR(50) NOT NULL,
	uloga VARCHAR(50) NOT NULL CHECK (uloga IN('admin', 'profesor', 'student')),
	id_profesora INT REFERENCES	profesori(id_profesora0),
	broj_indeksa VARCHAR(20) REFERENCES studenti(broj_indeksa),
	id_admina INT REFERENCES admini(id_admina),
	CHECK ((id_profesora IS NULL AND broj_indeksa IS NULL AND id_admina IS NOT NULL AND uloga = 'admin') OR
		  (id_profesora IS NULL AND broj_indeksa IS NOT NULL AND id_admina IS NULL AND uloga = 'student') OR
		  (id_profesora IS NOT NULL AND broj_indeksa IS NULL AND id_admina IS NULL AND uloga = 'profesor'))
);

DELIMITER //

CREATE FUNCTION IF NOT EXISTS mozeDaUpise(broj_indeksa_in VARCHAR(20), id_predmeta_in INT)
RETURNS INT
BEGIN
	DECLARE brojZavisnihPredmeta INT;
    DECLARE brojPolozenihPredmeta INT;
    DECLARE student_id_smera INT;
    DECLARE predmet_id_smera INT;
   	
    SET student_id_smera = (SELECT id_smera FROM studenti WHERE broj_indeksa = broj_indeksa_in);
    SET predmet_id_smera = (SELECT id_smera FROM predmeti WHERE id_predmeta = id_predmeta_in);
    
    SET brojZavisnihPredmeta = (SELECT COUNT(*) FROM zavisnosti WHERE id_predmeta_ko = id_predmeta_in);
    SET brojPolozenihPredmeta = (
        SELECT COUNT(*) 
        FROM ispiti 
        WHERE broj_indeksa = broj_indeksa_in AND 
        	 id_predmeta IN( SELECT id_predmeta_od FROM zavisnosti WHERE id_predmeta_ko = id_predmeta_in) AND
        	 ocena > 5
        );
   RETURN brojZavisnihPredmeta = brojPolozenihPredmeta AND student_id_smera = predmet_id_smera;
END; //

CREATE FUNCTION IF NOT EXISTS prestupnaGodina(godina INT)
RETURNS INT
BEGIN
	IF((godina % 4 = 0 AND godina % 100 <> 0) OR godina % 400 = 0) THEN
    	RETURN 1;
    END IF;
    RETURN 0;
END; //

CREATE FUNCTION IF NOT EXISTS brojDanaUMesecu(mesec INT, godina INT)
RETURNS INT
BEGIN
	CASE
        WHEN mesec IN(1, 3, 5, 7, 8, 10, 12) THEN RETURN 31;
        WHEN mesec IN(4, 6, 9, 11) THEN RETURN 30;
        WHEN mesec = 2 THEN RETURN (28 + prestupnaGodina(godina));
        ELSE SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = 'INVALID MONTH NUMBER', MYSQL_ERRNO = 1369;
    END CASE;
END; //

CREATE FUNCTION IF NOT EXISTS godinaIzJMBG(jmbg VARCHAR(13))
RETURNS INT
BEGIN
	DECLARE godina INT;
    DECLARE prvaCifra INT;
    
    SET godina = CAST(SUBSTR(jmbg, 5, 3) AS UNSIGNED);
    
    IF SUBSTR(jmbg, 5, 1) = '9' THEN 
    	SET prvaCifra = 1;
    ELSE 
    	SET prvaCifra = 2;
    END IF;
    
    RETURN (prvaCifra * 1000 + godina);
    
END; //

CREATE FUNCTION IF NOT EXISTS mesecIzJMBG(jmbg VARCHAR(13))
RETURNS INT
BEGIN
    RETURN CAST(SUBSTR(jmbg, 3, 2) AS UNSIGNED);
    
END; //

CREATE FUNCTION IF NOT EXISTS danIzJMBG(jmbg VARCHAR(13))
RETURNS INT
BEGIN
    RETURN CAST(SUBSTR(jmbg, 1, 2) AS UNSIGNED);
END; //

CREATE FUNCTION IF NOT EXISTS proveraJMBG(jmbg VARCHAR(13))
RETURNS INT
BEGIN
	DECLARE dan INT;
	DECLARE mesec INT;
	DECLARE godina INT;
    
    SET dan = danIzJMBG(jmbg);
    SET mesec = mesecIzJMBG(jmbg);
    SET godina = godinaIzJMBG(jmbg);
    
	IF LENGTH(jmbg) <> 13 OR mesec NOT BETWEEN 1 AND 12 OR dan <> brojDanaUMesecu(mesec, godina)
    	THEN RETURN 0;
    END IF;
    RETURN 1;
END; //

CREATE FUNCTION IF NOT EXISTS proveraIspita(broj_indeksa_in VARCHAR(20), id_predmeta_in INT)
RETURNS INT
BEGIN
	RETURN ((SELECT COUNT(*) FROM slusanja WHERE broj_indeksa = broj_indeksa_in AND id_predmeta = id_predmeta_in) = 1);
END; //

CREATE TRIGGER IF NOT EXISTS slusanja_before_insert
BEFORE INSERT
   ON slusanja FOR EACH ROW
BEGIN
	IF(mozeDaUpise(NEW.broj_indeksa, NEW.id_predmeta) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR slusanja FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS slusanja_before_update
BEFORE UPDATE
   ON slusanja FOR EACH ROW
BEGIN
	IF(mozeDaUpise(NEW.broj_indeksa, NEW.id_predmeta) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR slusanja FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS profesori_before_insert
BEFORE INSERT
ON profesori FOR EACH ROW
BEGIN
	IF(proveraJMBG(NEW.jmbg) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR profesori FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS profesori_before_update
BEFORE UPDATE
ON profesori FOR EACH ROW
BEGIN
	IF(proveraJMBG(NEW.jmbg) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR profesori FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS studenti_before_insert
BEFORE INSERT
ON studenti FOR EACH ROW
BEGIN
	IF(proveraJMBG(NEW.jmbg) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR studenti FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS studenti_before_update
BEFORE UPDATE
ON studenti FOR EACH ROW
BEGIN
	IF(proveraJMBG(NEW.jmbg) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR studenti FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS admini_before_insert
BEFORE INSERT
ON admini FOR EACH ROW
BEGIN
	IF(proveraJMBG(NEW.jmbg) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR admini FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS admini_before_update
BEFORE UPDATE
ON admini FOR EACH ROW
BEGIN
	IF(proveraJMBG(NEW.jmbg) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR admini FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS ispiti_before_insert
BEFORE INSERT
   ON ispiti FOR EACH ROW
BEGIN
	IF(proveraIspita(NEW.broj_indeksa, NEW.id_predmeta) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR ispiti FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

CREATE TRIGGER IF NOT EXISTS ispiti_before_update
BEFORE UPDATE
   ON ispiti FOR EACH ROW
BEGIN
	IF(proveraIspita(NEW.broj_indeksa, NEW.id_predmeta) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR ispiti FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

DELIMITER ;