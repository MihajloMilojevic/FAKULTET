CREATE TABLE grupe(
	id_grupe INT AUTO_INCREMENT PRIMARY KEY ,
	naziv VARCHAR(100) NOT NULL
);

CREATE TABLE smerovi(
	id_smera INT AUTO_INCREMENT PRIMARY KEY,
	naziv VARCHAR(100) NOT NULL,
	id_grupe NUMERIC NOT NULL REFERENCES grupe(id_grupe)
);

CREATE TABLE gradovi(
	id_grada NUMERIC PRIMARY KEY,
	naziv VARCHAR(50) NOT NULL
);

CREATE TABLE profesori(
	id_profesora INT AUTO_INCREMENT PRIMARY KEY,
	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
	ime VARCHAR(50) NOT NULL,
	prezime VARCHAR(50) NOT NULL,
	mejl VARCHAR(50) NOT NULL UNIQUE,
	adresa VARCHAR(100) NOT NULL,
	telefon VARCHAR(20) NOT NULL,
	plata NUMERIC NOT NULL
);

CREATE TABLE studenti(
	broj_indeksa VARCHAR(20) PRIMARY KEY,
	jmbg VARCHAR(13) UNIQUE CHECK (LENGTH(jmbg) = 13),
	ime VARCHAR(50) NOT NULL,
	prezime VARCHAR(50) NOT NULL,
	mejl VARCHAR(50) NOT NULL UNIQUE,
	id_grada NUMERIC NOT NULL REFERENCES gradovi(id_grada),
	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera)
);

CREATE TABLE predmeti(
	id_predmeta INT AUTO_INCREMENT PRIMARY KEY,
	naziv VARCHAR(50) NOT NULL,
	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera),
	id_profesora NUMERIC NOT NULL REFERENCES profesori(id_profesora),
	nedeljni_fond NUMERIC NOT NULL
);

CREATE TABLE zavisnosti(
	id_predmeta_od NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	id_predmeta_ko NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	PRIMARY KEY(id_predmeta_od, id_predmeta_ko)
);

CREATE TABLE ispiti(
	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
	ocena NUMERIC NOT NULL CHECK (ocena BETWEEN 5 AND 10),
	PRIMARY KEY (id_predmeta, broj_indeksa)
);

DELIMITER //

CREATE FUNCTION mozeDaUpise(broj_indeksa_in VARCHAR(20), id_predmeta_in INT)
RETURNS INT
BEGIN
	DECLARE brojZavisnihPredmeta INT;
    DECLARE brojPolozenihPredmeta INT;
    
    SET brojZavisnihPredmeta = (SELECT COUNT(*) FROM zavisnosti WHERE id_predmeta_ko = id_predmeta_in);
    SET brojPolozenihPredmeta = (
        SELECT COUNT(*) 
        FROM ispiti 
        WHERE broj_indeksa = broj_indeksa_in AND 
        	 id_predmeta IN( SELECT id_predmeta_od FROM zavisnosti WHERE id_predmeta_ko = id_predmeta_in) AND
        	 ocena > 5
        );
   RETURN brojZavisnihPredmeta = brojPolozenihPredmeta;
END; //

DELIMITER ;

CREATE TABLE slusanja(
	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
	PRIMARY KEY (id_predmeta, broj_indeksa),
	CHECK (mozeDaUpise(broj_indeksa, id_predmeta) = 1)
);

DELIMITER //

CREATE FUNCTION prestupnaGodina(godina INT)
RETURNS INT

BEGIN
	IF((godina % 4 = 0 AND godina % 100 <> 0) OR godina % 400 = 0) THEN
    	RETURN 1;
    END IF;
    RETURN 0;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER slusanja_before_insert
BEFORE INSERT
   ON slusanja FOR EACH ROW

BEGIN
	IF(mozeDaUpise(NEW.broj_indeksa, NEW.id_predmeta) = 0) THEN
    	SIGNAL SQLSTATE 'HY000'
                 SET MESSAGE_TEXT = 'CHECK CONSTRAINT FOR slusanja FAILED', MYSQL_ERRNO = 1369;
    END IF;
END; //

DELIMITER ;