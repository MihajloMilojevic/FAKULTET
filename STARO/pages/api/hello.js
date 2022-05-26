// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { login } from "../../DATABASE/controllers/korisnik"

export default async function handler(req, res) {
  let korisnik = await login({mejl: "milojevicm374@gmail.com"});
  res.status(200).json({data: JSON.stringify(korisnik), type: typeof korisnik})
}
