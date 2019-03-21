const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queries = require('../database/queries');


router.post('/signup', (req, res) => {
	const {login, email, password, password_repeat} = req.body;
	if (!login 
			|| !email 
			|| !password 
			|| !password_repeat 
			|| password !== password_repeat) {
		return res.status(400).json({
			success: false,
			message: "Failed to create user"
		});
	}
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				error: err
			});
		} else {
			queries.createUser(login, email, hash)
				.then((result) => {
					res.status(201).json(result);
				})
				.catch((err) => {
					res.status(500).json(err);
				})
		}
	})
});

router.post('/signin', (req, res) => {
	const {email, password} = req.body;
	queries.getUserByEmail(email)
		.then((user) => {
			bcrypt.compare(password, user.hashed_pass, (err, result) => {
				if (err) {
					return res.status(401).json({
						failed: 'Unauthorized Access'
					});
				}
				if (result) {
					const payload = {
						email,
						id: user.id
					}
					const JWTToken = jwt.sign({
						email: user.email,
						id: user.id
					},
					'secret',
					{
						expiresIn: '2h'
					});
					return res.status(200).json({
						success: 'Welcome my dear friend',
						token: JWTToken
					});
				}
				return res.status(401).json({
						failed: 'Unauthorized Access'
					});
			})
		})
		.catch((err) => {
			res.status(401).json({
				failed: 'Unauthorized Access'
			});
		}
	);
})

module.exports = router;
