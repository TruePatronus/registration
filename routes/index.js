const queries = require('../database/queries');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.status(200).send('Hello');
	});

	app.get('/users', queries.getUsers);
	app.get('/users/:id', queries.getUserById);
	app.post('/users', queries.createUser);
};
