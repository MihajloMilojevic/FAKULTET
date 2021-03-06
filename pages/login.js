import { useState, useEffect } from "react"
import useFetch from "../hooks/useFetch";
import { useRouter } from "next/router";
import Auth from "../middleware/authentication";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Home() {
	const router = useRouter()
	const [options, setOptions] = useState({
		method: "POST", 
		headers: {"Content-Type": "application/json"}, 
		body: JSON.stringify({})
	})
	const [formData, setFormData] = useState({
		mejl: "",
		lozinka: ""
	})
	const {error, data} = useFetch("/api/login", options, false);

	useEffect(() => {
		if(!data) return;
		if(data?.ok)
		 	router.push("/");
		else if(data?.message)
			console.error(data?.message);
		if(error)
			console.error(error.message);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, error]);

	async function handleSubmit(e) {
		e.preventDefault();
		setOptions({...options, body: JSON.stringify(formData)});
	}
	function handleChange(e) {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	return (
	  <>
		<form onSubmit={handleSubmit} >
			<TextField
				name="mejl"
				id="mejl"
				label="Mejl"
				type="text"
				variant="standard"
				value={formData.mejl}
				onChange={handleChange}
			/> <br/>
			<TextField
				name="lozinka"
				id="lozinka"
				label="Lozinka"
				type="password"
				variant="standard"
				value={formData.lozinka}
				onChange={handleChange}
			/> <br/>
			<Button type="submit">Prijavi se</Button>
		</form>
		<p>{!data?.ok ? data?.message : (error ? error.message : "")}</p>
	</>
	)
}

export async function getServerSideProps({req, res}) {
	// return {props: {}}
	try {
		await Auth(req, res);
		return {
			redirect: {
			permanent: false,
			destination: "/",
		  },
		  props: {}}
	} catch (error) {
		return {
			props:{},
		  };
	}
}