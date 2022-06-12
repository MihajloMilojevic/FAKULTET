import Link from "next/link";

export default function HomeAdmin() {
	return (
		<>
			<Link href="/gradovi">Gradovi</Link> <br/>
			<Link href="/grupe">Grupe</Link> <br/>
			<Link href="/smerovi">Smerovi</Link> <br/>
			<Link href="/profesori">Profesori</Link> <br/>
			<Link href="/studenti">Studenti</Link> <br/>
			<Link href="/predmeti">Predmeti</Link> <br/>
		</>
	)
}