const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'registration',
	password: 'postgres',
	port: 5432
});

const createUser = (login, email, hashed_pass) => {
	return new Promise((resolve, reject) => {
		pool.query('INSERT INTO users (login, email, hashed_pass) VALUES($1, $2, $3)', [login, email, hashed_pass], (err, results) => {
			if (err) {
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