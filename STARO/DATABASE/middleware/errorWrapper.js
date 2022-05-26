import errorHandler from "./errorHandler";

async function errorWrapper(cb) {
	return async function(req, res) {
		try {
			cb(req, res);
		} catch (error) {
			errorHandler(error, req, res);
		}
	}
}