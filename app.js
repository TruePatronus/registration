const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const user = require('./routes/user.route');
const logger = require('morgan');
const secret = require('./routes/secret.route');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/checking', (req, res) => {
	res.json({
		"Message":"Welcome to Express PostgreSQL JWT Auth app"
	});
});

app.use('/user', user);
app.use('/secret', secret);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
})
