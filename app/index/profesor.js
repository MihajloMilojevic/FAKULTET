import Link from "next/link";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

export default function HomeProfesor({korisnik, predmeti}) {

	const [smerovi, setSmerovi] = useState(distinctSmerovi(predmeti));

	return (
		<div>
			{
				smerovi.map((smer, index) => (
					<Accordion key={index}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							id={smer.id_smera}
						>
						<Typography>{smer.naziv}</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<ul>
							{
								predmeti
									.filter(predmet => predmet.id_smera == smer.id_smera)
									.map((predmet, index) => (
										<li key={index}>
											<Link href={`/predmeti/${predmet.id_predmeta}`}>{predmet.naziv}</Link>
										</li>
									))
							}
						</ul> 
						</AccordionDetails>
					</Accordion>
				))
			}
		</div>
	)
}

function distinctSmerovi(predmeti) {
	const obj = {};
	predmeti.forEach(predmet => {
		obj[predmet.id_smera] = predmet.smer
	})
	return Object.keys(obj).map(key => ({id_smera: key, naziv: obj[key]}));
}