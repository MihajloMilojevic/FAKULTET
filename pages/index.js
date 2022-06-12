import Auth from "../middleware/authentication";
import {podaci} from "../controllers/korisnik";
import {serialize} from "../utils/index";
import { useRouter } from "next/router";
import { Predmet } from "../models";
import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo";
import {HomeAdmin, HomeProfesor, HomeStudent, } from "../app/index";

export default function Home(props) {
	const {korisnik} = props;
	const router = useRouter();
	return (
		<>
			<button onClick={
				async () => {
					try {
						console.log("fetch");
						const res = await fetch("/api/logout");
						const data = await res.json();
						if(data.ok)
							router.push("/login");
					} catch {
						alert("Greska")
					}
				}
			}>LOGOUT</button> <br/>
			<p>Zdravo: {korisnik.ime} {korisnik.prezime}</p>
			{
				korisnik.uloga === "admin" ? <HomeAdmin {...props} /> :
				korisnik.uloga === "profesor" ? <HomeProfesor {...props} /> :
												<HomeStudent {...props} />
			}
		</>
	)
}

export async function getServerSideProps({req, res}) {
	try {
		const user = await Auth(req, res);
		const korisnik = await podaci(user.mejl)
		const props = {korisnik: serialize({...user, ...korisnik})}
		switch(user.uloga)
		{
			case "profesor":
				var data = await Predmet.query(
					"SELECT p.id_predmeta, p.naziv, p.id_smera, s.naziv smer, CONCAT(prof.ime, ' ', prof.prezime) profesor, p.nedeljni_fond " +
					"FROM predmeti p JOIN smerovi s USING(id_smera) JOIN profesori prof USING(id_profesora) " +
					"WHERE p.id_profesora = " + korisnik.id_profesora 
				);
				props.predmeti = serialize(data);
				break;
			case "student":
				var data = await mysqlLikeMongo.Query(
					`SELECT p.id_predmeta, p.naziv, p.id_profesora ` +
					`FROM studenti st JOIN slusanja sl USING(broj_indeksa) ` +
					`JOIN predmeti p USING(id_predmeta) ` +
					`WHERE st.broj_indeksa = '${korisnik.broj_indeksa}'` 
				)
				console.log({slusa: data});
				props.slusa = serialize(data);
				data = await Predmet.find({id_smera: korisnik.id_smera})
				props.predmeti = serialize(data);
		}
		return {props}
	} catch (error) {
		return {
			redirect: {
			  permanent: false,
			  destination: "/login",
			},
			props:{},
		  };
	}
}
