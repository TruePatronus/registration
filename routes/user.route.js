const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const queries = require('../database/queries');


router.post('/signup', (req, res) => {
	console.log('SIGNUP ROUTE STARTS');
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
	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			console.log('hash error');
			return res.status(500).json({
				success: false,
				message: "Failed to create user"				
			});
		} else {
			queries.createUser(login, email, hash)
				.then((result) => {
					res.status(201).json(result);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({
						success: false,
						message: "Failed to create user"
					});
				})
		}
	})
});

router.post('/signin', (req, res) => {
	const {email, password} = req.body;
	queries.getUserByEmail(email)
		.then((user) => {
			bcrypt.compare(password, user.hashed_password, (err, result) => {
				if (err) {
					console.log('bcrypt compare failed');
					return res.status(401).json({
						failed: 'Unauthorized Access'
					});
				}
				if (result) {
					const payload = {
						email,
						id: user.id
					}
					const JWTToken = jwt.sign(payload,
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
