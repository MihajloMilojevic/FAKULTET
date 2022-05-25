import {Grupa} from "../../../DATABASE/models";
import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo";

import connection from "../../../DATABASE/connection/connect";

export default async function Fun(req, res) {
	//const data = await Grupa.find({});
	res.json(JSON.stringify(connection) /*|| JSON.stringify(data)*/);
}