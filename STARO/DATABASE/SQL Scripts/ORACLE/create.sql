CREATE TABLE grupe(
	id_grupe NUMERIC PRIMARY KEY,
	naziv VARCHAR(100) NOT NULL
);

CREATE SEQUENCE grupe_id_seq;

CREATE TABLE smerovi(
	id_smera NUMERIC PRIMARY KEY,
	naziv VARCHAR(100) NOT NULL,
	id_grupe NUMERIC NOT NULL REFERENCES grupe(id_grupe)
);

CREATE SEQUENCE smerovi_id_seq;

CREATE TABLE gradovi(
	id_grada NUMERIC PRIMARY KEY,
	naziv VARCHAR(50) NOT NULL
);

CREATE TABLE profesori(
	id_profesora NUMERIC PRIMARY KEY,
	jmbg VARCHAR(13) UNIQUE NOT NULL CHECK (LENGTH(jmbg) = 13),
	ime VARCHAR(50) NOT NULL,
	prezime VARCHAR(50) NOT NULL,
	mejl VARCHAR(50) NOT NULL UNIQUE,
	adresa VARCHAR(100) NOT NULL,
	telefon VARCHAR(20) NOT NULL,
	plata NUMERIC NOT NULL
);

CREATE SEQUENCE profesori_id_seq;

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
	id_predmeta NUMERIC PRIMARY KEY,
	naziv VARCHAR(50) NOT NULL,
	id_smera NUMERIC NOT NULL REFERENCES smerovi(id_smera),
	id_profesora NUMERIC NOT NULL REFERENCES profesori(id_profesora),
	nedeljni_fond NUMERIC NOT NULL
);

CREATE SEQUENCE predmeti_id_seq;

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

CREATE TABLE slusanja(
	id_predmeta NUMERIC NOT NULL REFERENCES predmeti(id_predmeta),
	broj_indeksa VARCHAR(20) NOT NULL REFERENCES studenti(broj_indeksa),
	PRIMARY KEY (id_predmeta, broj_indeksa)
);