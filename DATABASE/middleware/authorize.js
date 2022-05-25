const { ForbiddenError } = require('../errors')

const auth = async (req, res, allowed) => {
	const user = req.user;
	if(allowed.findIndex(element => element === user.uloga) === -1)
		throw new ForbiddenError("Pristup zapanjen");
}

module.exports = auth