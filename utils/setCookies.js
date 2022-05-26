const {Korisnik} = require("../models");

const attachCookies = ( res, korisnik, expires ) => {
	const token = korisnik.token();
  
	res.cookie('token', token, {
	  httpOnly: true,
	  expires
	});
  };

module.exports = attachCookies;