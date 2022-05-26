import errorHandler from "./errorHandler";

export default function errorWrapper(cb) {
	return async function(req, res) {
		try {
			await cb(req, res);
		} catch (error) {
			errorHandler(error, req, res);
		}
	}
}