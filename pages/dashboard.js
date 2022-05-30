import Auth from "../middleware/authentication";
import {podaci} from "../controllers/korisnik";
import {serialize} from "../utils/index";
import { useRouter } from "next/router";

export default function Dashboard({korisnik}) {
	
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
							router.push("/");
					} catch {
						alert("Greska")
					}
				}
			}>LOGOUT</button> <br/>
			<p>Dashboard</p>
			<p>Zdravo: {korisnik.ime} {korisnik.prezime}</p>
		</>
	)
}

export async function getServerSideProps({req, res}) {
	try {
		const user = await Auth(req, res);
		const korisnik = await podaci(user.mejl)
		return {
			props: {
				korisnik: serialize({...user, ...korisnik})
			}
		}
	} catch (error) {
		return {
			redirect: {
			  permanent: false,
			  destination: "/",
			},
			props:{},
		  };
	}
}
