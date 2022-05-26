const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res) => {
  const token = req.cookies.token;
  
  if(!token)
  	throw new UnauthenticatedError('Authentication error')
  try {
    const sadrzaj = jwt.verify(token, process.env.JWT_SECRET) // VERIFY TOKEN
    return {mejl: sadrzaj.mejl, uloga: sadrzaj.uloga}
  } catch (error) {
    throw new UnauthenticatedError('Authentication error')
  }
}

module.exports = auth