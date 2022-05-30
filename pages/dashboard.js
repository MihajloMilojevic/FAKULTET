import Auth from "../middleware/authentication";
import {podaci} from "../controllers/korisnik";
import {serialize} from "../utils/index";

export default function Dashboard({korisnik, user}) {
	
	
	return (
		<>
			<p>Dashboard</p>
			<p>User: {JSON.stringify(user)}</p>
			<p>Korisnik: {JSON.stringify(korisnik)}</p>
		</>
	)
}

export async function getServerSideProps({req, res}) {
	// return {
	// 	props: {
	// 		user: "user",
	// 		korisnik: "korisnik"
	// 	}
	// }
	try {
		const user = await Auth(req, res);
		const korisnik = await podaci(user.mejl)
		
		return {
			props: {
				korisnik: serialize(korisnik),
				user: serialize(user)
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