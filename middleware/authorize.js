const { ForbiddenError } = require('../errors')

const Authorize = async (user, allowed) => {
	if(allowed.findIndex(element => element === user.uloga) === -1)
		throw new ForbiddenError("Pristup zapanjen");
}

module.exports = Authorize