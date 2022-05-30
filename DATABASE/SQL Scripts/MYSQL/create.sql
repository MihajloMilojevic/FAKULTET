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
	lozinka VARCHAR(100) NOT NULL,
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
    
	IF LENGTH(jmbg) <> 13 OR mesec NOT BETWEEN 1 AND 12 OR dan > brojDanaUMesecu(mesec, godina)
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

INSERT INTO `admini` (`jmbg`, `ime`, `prezime`, `mejl`, `adresa`, `telefon`) 
VALUES ('3105004780024', 'Mihajlo', 'Milojevic', 'milojevicm374@gmail.com', '8. mart 70', '0649781191');

INSERT INTO `korisnici` (`mejl`, `lozinka`, `uloga`, `id_profesora`, `broj_indeksa`, `id_admina`) VALUES
('milojevicm374@gmail.com', '$2a$10$qDcUywExzM4vOa4/ZXEW9efYiPc5I/FVkK8zM2hd/K0WY7lvA99IG', 'admin', NULL, NULL, 1);


















INSERT INTO gradovi (id_grada, naziv)
VALUES(24430, 'Ada');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12370, 'Aleksandrovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37230, 'Aleksandrovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18220, 'Aleksinac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26310, 'Alibunar');

INSERT INTO gradovi (id_grada, naziv)
VALUES(25260, 'Apatin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34300, 'Aranđelovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31230, 'Arilje');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18330, 'Babušnica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21420, 'Bač');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21400, 'Bačka Palanka');

INSERT INTO gradovi (id_grada, naziv)
VALUES(24300, 'Bačka Topola');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21470, 'Bački Petrovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31250, 'Bajina Bašta');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11460, 'Barajevo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34227, 'Batočina');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21220, 'Bečej');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15313, 'Bela Crkva');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26340, 'Bela Crkva');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18310, 'Bela Palanka');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21300, 'Beočin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18420, 'Blace');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15350, 'Bogatić');

INSERT INTO gradovi (id_grada, naziv)
VALUES(16205, 'Bojnik');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19370, 'Boljevac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19210, 'Bor');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37220, 'Brus');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17520, 'Bujanovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(16215, 'Crna Trava');

INSERT INTO gradovi (id_grada, naziv)
VALUES(32000, 'Čačak');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31310, 'Čajetina');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23320, 'Čoka');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37210, 'Ćićevac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35230, 'Ćuprija');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35213, 'Despotovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18410, 'Doljevac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18240, 'Gadžin Han');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35222, 'Glogovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12223, 'Golubac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(32300, 'Gornji Milanovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(22320, 'Inđija');

INSERT INTO gradovi (id_grada, naziv)
VALUES(22406, 'Irig');

INSERT INTO gradovi (id_grada, naziv)
VALUES(32250, 'Ivanjica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35000, 'Jagodina');

INSERT INTO gradovi (id_grada, naziv)
VALUES(24420, 'Kanjiža');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23300, 'Kikinda');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19320, 'Kladovo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34240, 'Knić');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19350, 'Knjaževac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15220, 'Koceljeva');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31260, 'Kosjerić');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38210, 'Kosovo Polje');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38260, 'Kosovska Kamenica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38220, 'Kosovska Mitrovica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12208, 'Kostolac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26210, 'Kovačica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26220, 'Kovin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34000, 'Kragujevac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(36000, 'Kraljevo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15314, 'Krupanj');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37000, 'Kruševac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12240, 'Kučevo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(25230, 'Kula');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18430, 'Kuršumlija');

INSERT INTO gradovi (id_grada, naziv)
VALUES(14224, 'Lajkovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34221, 'Lapovo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11550, 'Lazarevac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(16230, 'Lebane');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38218, 'Leposavić');

INSERT INTO gradovi (id_grada, naziv)
VALUES(16000, 'Leskovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15300, 'Loznica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(32240, 'Lučani');

INSERT INTO gradovi (id_grada, naziv)
VALUES(14240, 'Ljig');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15320, 'Ljubovija');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19250, 'Majdanpek');

INSERT INTO gradovi (id_grada, naziv)
VALUES(24321, 'Mali Iđoš');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15318, 'Mali Zvornik');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12311, 'Malo Crniće');

INSERT INTO gradovi (id_grada, naziv)
VALUES(16240, 'Medveđa');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35224, 'Medveđa');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37244, 'Medveđa');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18252, 'Merošina');

INSERT INTO gradovi (id_grada, naziv)
VALUES(14242, 'Mionica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11400, 'Mladenovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19300, 'Negotin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18205, 'Niška Banja');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23218, 'Nova Crnja');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31320, 'Nova Varoš');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23272, 'Novi Bečej');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23330, 'Novi Kneževac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(36300, 'Novi Pazar');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21101, 'Novi Sad');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11500, 'Obrenovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(25250, 'Odžaci');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26204, 'Opovo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(14253, 'Osečina');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26101, 'Pančevo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35250, 'Paraćin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(22410, 'Pećinci');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21131, 'Petrovaradin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18300, 'Pirot');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26360, 'Plandište');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12000, 'Požarevac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31210, 'Požega');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17523, 'Preševo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31330, 'Priboj');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31300, 'Prijepolje');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18400, 'Prokuplje');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18440, 'Rača');

INSERT INTO gradovi (id_grada, naziv)
VALUES(36350, 'Raška');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37215, 'Ražanj');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35260, 'Rekovac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(22400, 'Ruma');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23240, 'Sečanj');

INSERT INTO gradovi (id_grada, naziv)
VALUES(24400, 'Senta');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31205, 'Sevojno');

INSERT INTO gradovi (id_grada, naziv)
VALUES(36310, 'Sjenica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11300, 'Smederevo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11420, 'Smederevska Palanka');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18230, 'Sokobanja');

INSERT INTO gradovi (id_grada, naziv)
VALUES(25101, 'Sombor');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11450, 'Sopot');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21480, 'Srbobran');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21205, 'Sremski Karlovci');

INSERT INTO gradovi (id_grada, naziv)
VALUES(22300, 'Stara Pazova');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34323, 'Stragari');

INSERT INTO gradovi (id_grada, naziv)
VALUES(24000, 'Subotica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17530, 'Surdulica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(35210, 'Svilajnac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18360, 'Svrljig');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15000, 'Šabac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(22239, 'Šid');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38236, 'Štrpce');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21235, 'Temerin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21240, 'Titel');

INSERT INTO gradovi (id_grada, naziv)
VALUES(34310, 'Topola');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17525, 'Trgovište');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37240, 'Trstenik');

INSERT INTO gradovi (id_grada, naziv)
VALUES(36320, 'Tutin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(14210, 'Ub');

INSERT INTO gradovi (id_grada, naziv)
VALUES(31000, 'Užice');

INSERT INTO gradovi (id_grada, naziv)
VALUES(14000, 'Valjevo');

INSERT INTO gradovi (id_grada, naziv)
VALUES(37260, 'Varvarin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(11320, 'Velika Plana');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18403, 'Velika Plana');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12220, 'Veliko Gradište');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17510, 'Vladičin Han');

INSERT INTO gradovi (id_grada, naziv)
VALUES(15225, 'Vladimirci');

INSERT INTO gradovi (id_grada, naziv)
VALUES(16210, 'Vlasotince');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17501, 'Vranje');

INSERT INTO gradovi (id_grada, naziv)
VALUES(17541, 'Vranjska Banja');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21460, 'Vrbas');

INSERT INTO gradovi (id_grada, naziv)
VALUES(36210, 'Vrnjačka Banja');

INSERT INTO gradovi (id_grada, naziv)
VALUES(26300, 'Vršac');

INSERT INTO gradovi (id_grada, naziv)
VALUES(19000, 'Zaječar');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23101, 'Zrenjanin');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38228, 'Zubin Potok');

INSERT INTO gradovi (id_grada, naziv)
VALUES(38227, 'Zvečan');

INSERT INTO gradovi (id_grada, naziv)
VALUES(21230, 'Žabalj');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12374, 'Žabari');

INSERT INTO gradovi (id_grada, naziv)
VALUES(12320, 'Žagubica');

INSERT INTO gradovi (id_grada, naziv)
VALUES(23210, 'Žitište');

INSERT INTO gradovi (id_grada, naziv)
VALUES(18412, 'Žitorađa');