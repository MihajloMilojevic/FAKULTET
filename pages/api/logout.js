import Errors from "../../errors";
import {setCookies} from "../../utils";
import errorWrapper from "../../middleware/errorWrapper";
import { StatusCodes } from "http-status-codes";

async function Resolver(req, res) {
	setCookies(res, [{
		kljuc: "token",
		vrednost: ""
	}], {
		expires: new Date(Date.now() + 1)
	})
	res.status(StatusCodes.OK).json({ok: true})
}

export default errorWrapper(Resolver);