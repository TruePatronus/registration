const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	host: 'db',
	database: 'postgres',
	password: 'postgres',
	port: 5432
});

const createUser = (login, email, hashed_password) => {
	console.log('CREATE USER START');
	return new Promise((resolve, reject) => {
		pool.query('INSERT INTO users (login, email, hashed_password) VALUES($1, $2, $3)', [login, email, hashed_password], (err, results) => {
			if (err) {
				console.log("ERROR", err);
				reject({
					success: false,
					message: 'Registration failed'
				});
			}
			resolve({
				success: true,
				message: 'User registered'
			})
		});
	});
} 

const getUsers = () => {
	return new Promise((resolve, reject) => {
		pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
			if(err) {
				reject(err);
			}
			resolve(results.rows);
		});
	})
	
};

const getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		pool.query('SELECT * FROM USERS WHERE email = $1', [email], (err, results) => {
			if (err) {
				reject(err);
			}
			resolve(results.rows[0]);
		});
	});
};

module.exports = {
	getUsers,
	createUser,
	getUserByEmail
}