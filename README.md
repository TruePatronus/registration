Authorization API with express, postgreSQL, jwt
====



Running app
-----
Type 'npm i' to install dependencies
Type 'npm start' to run the application

Usage
-----

User can be registered by sending POST request to __localhost:3000/user/signup__ 
with these JSON params: **login email password password_repeat**  

To login and reciewe JWT token you need to send POST request to __localhost:3000/user/signin__
with **email password** JSON params. 

You can access users list by sending GET request to __localhost:3000/secret/users__
with token as parameter.
