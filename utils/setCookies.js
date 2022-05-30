
const attachCookies = ( res, arr, options = {} ) => {
	for(let i = 0; i < arr.length; i++)
		res.cookie(arr[i].kljuc, arr[i].vrednost, {
			httpOnly: true,
			...options
		});
  };

module.exports = attachCookies;