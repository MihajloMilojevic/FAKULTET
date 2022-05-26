-- GRUPE START --

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Menadžment i organizacija');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Elektrotehničko i računarsko inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Arhitektura');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Biomedicinsko inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Energetske tehnologije');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Geodetsko inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Grafičko inženjerstvo i dizajn');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Građevinsko inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Industrijsko inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Inženjerstvo zaštite od katastrofalnih događaja i požara');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Inženjerstvo zaštite životne sredine i zaštite na radu');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Mašinsko inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Mehatronika');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Računarska grafika');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Saobraćajno inženjerstvo');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Scenska arhitektura, tehnika i dizajn');

INSERT INTO grupe(id_grupe, naziv)
VALUES(grupe_id_seq.NEXTVAL, 'Jezik, književnost, kultura');

-- INSERT INTO grupe(id_grupe, naziv)
-- VALUES(grupe_id_seq.NEXTVAL, '');

-- GRUPE END --

-- SMEROVI START --

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Menadžment', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Menadžment i organizacija'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Operacioni, menadžment', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Menadžment i organizacija'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Menadžment, kvaliteta i standardizacije', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Menadžment i organizacija'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Informacion, i sistemi i tehnologije', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));


INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Arhitektura,', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Arhitektura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Biomedicinsko inženjerstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Biomedicinsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Energetika, elektronika i telekomunikacije', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Računarstvo i automatika', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Merenje i regulacija', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Primenjeno softversko inženjerstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Softversko inženjerstvo i informacione tehnologije', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Informacioni inženjering', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Elektrotehničko i računarsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Čiste energetske tehnologije', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Energetske tehnologije'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Geodezija i geoinformatika', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Geodetsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Grafičko inženjerstvo i dizajn', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Grafičko inženjerstvo i dizajn'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Građevinarstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Građevinsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Industrijsko inženjerstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Industrijsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Inženjerski menadžment', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Menadžment i organizacija'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Inženjerstvo informacionih sistema', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Industrijsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Upravljanje rizikom od katastrofalnih događaja i požara', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Inženjerstvo zaštite od katastrofalnih događaja i požara'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Inženjerstvo zaštite na radu', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Inženjerstvo zaštite životne sredine i zaštite na radu'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Inženjerstvo zaštite životne sredine', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Inženjerstvo zaštite životne sredine i zaštite na radu'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Proizvodno mašinstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Mašinsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Mehanizacija i konstrukciono mašinstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Mašinsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Energetika i procesna tehnika', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Mašinsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Tehnička mehanika i dizajn u tehnici', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Mašinsko inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Mehatronika', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Mehatronika'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Animacija u inženjerstvu', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Računarska grafika'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Poštanski saobraćaj i telekomunikacije', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Saobraćajno inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Saobraćaj i transport', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Saobraćajno inženjerstvo'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Scenska arhitektura, tehnika i dizajn', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Scenska arhitektura, tehnika i dizajn'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Jezik, književnost, kultura', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Srpski jezik i književnost', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Bibliotekarstvo', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Svetska književnost', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Srpska književnost i jezik', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Srpska književnost i jezik sa komparatistikom', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Ruski jezik i književnost', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Engleski jezik i književnost', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Istorija', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Istorija umetnosti', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Filozofija', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Pedagogija', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Psihologija', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

INSERT INTO smerovi(id_smera, naziv, id_grupe)
VALUES(smerovi_id_seq.NEXTVAL, 'Sociologija', (
	SELECT id_grupe 
	FROM grupe
	WHERE naziv = 'Jezik, književnost, kultura'
));

-- INSERT INTO smerovi(id_smera, naziv, id_grupe)
-- VALUES(smerovi_id_seq.NEXTVAL, '', (
-- 	SELECT id_grupe 
-- 	FROM grupe
-- 	WHERE naziv = ''
-- ));

-- SMEROVI END --



-- GRADOVI START -- 

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

-- GRADOVI END --