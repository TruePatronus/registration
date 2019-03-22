const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyJWT_MW = require('../middleware/auth');
const queries = require('../database/queries');

router.use(verifyJWT_MW);

router.get('/users', (req, res) => {
	queries.getUsers()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(401).json(err);
		})
});


module.exports = router;
