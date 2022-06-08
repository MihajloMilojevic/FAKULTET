import Auth from "../middleware/authentication";
import {podaci} from "../controllers/korisnik";
import {serialize} from "../utils/index";
import { useRouter } from "next/router";
import { Predmet } from "../models";
import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo";
import Link from "next/link";

export default function Home({korisnik}) {
	
	const router = useRouter()
	
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
			<p>Dashboard</p>
			<p>Zdravo: {korisnik.ime} {korisnik.prezime}</p>
			<Link href="/gradovi">Gradovi</Link> <br/>
			<Link href="/grupe">Grupe</Link> <br/>
			<Link href="/smerovi">Smerovi</Link> <br/>
			<Link href="/profesori">Profesori</Link> <br/>
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
				var {data, error} = await Predmet.find({id_profesora: korisnik.id_profesora});
				if(error)
					throw error;
				props.predmeti = data;
				break;
			case "student":
				var {data, error} = await mysqlLikeMongo.Query(
					`SELECT p.id_predmeta, p.naziv, p.id_profesora ` +
					`FROM studenti st JOIN slusanja sl USING(broj_indeksa) ` +
					`JOIN predmeti p USING(id_predmeta);`
					)
				if (error) 
					throw error;
				props.predmeti = data;
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
