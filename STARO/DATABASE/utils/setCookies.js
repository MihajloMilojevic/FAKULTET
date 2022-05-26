const {Korisnik} = require("../models");

const attachCookies = ( res, korisnik ) => {
	const token = korisnik.token();
  
	res.cookie('token', token, {
	  httpOnly: true,
	});
  };

module.exports = attachCookies;