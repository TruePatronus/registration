const jwt = require('jsonwebtoken');

const verifyJWT = (token) => {
	return new Promise((resolve, reject) => {
		if (token) {
			jwt.verify(token, 'secret', (err, decodedToken) => {
				if (err || !decodedToken) {
					return reject(err)
				}

				resolve(decodedToken);
			})
		} else {
			reject()
		}
	})
}

const verifyJWT_MW = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token']; 
	verifyJWT(token)
		.then((decodedToken) => {
			req.user = decodedToken;
			next();
		})
		.catch((err) => {
			res.status(400).json({
				message:"Invalid token"
			})
		})
}

module.exports = verifyJWT_MW