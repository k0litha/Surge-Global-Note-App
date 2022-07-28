# Surge Global Internship Assignment 

A simple note taking web application built using React.Js, Node.Js, Express.Js and MongoDB. This application satisfies almost all the requirements such as proper error handling, role-based authentication with JWT, private user routes, backend pagination with frontend page numbering and many others. 

Notes are displayed as cards with cleaner and simple looking user interface. A student user can create, update or delete notes as they wish. An admin user can view the list of users in the database with their full details. An admin user also can create a student user and the server will automatically send the credentials to the corresponding email address.

## Installation using docker-compose 

#### Prerequisites
* Docker installed.
* Windows 10/11 OS.

#### Installation
* First move into the BACKEND directory.<br>`cd BACKEND`</br>
* Then in the .env file, change the `MONGO_URI` host name to `db` as follows,<br>`MONGO_URI="mongodb://localhost:27017/noteDB"`</br>to,<br>`MONGO_URI="mongodb://db:27017/noteDB"`</br>
* Then go back to parent directory and run the following command.<br>`docker-compose up`</br>
* Finally open http://localhost:3000 to view it in your browser
* Use the following credentials to test the application.<br>`ADMIN: email='admin@gmail.com'  password='admin'`</br><br>`STUDENT: email='student@gmail.com'  password='student'`</br><br>`STUDENT(First time login): email='tempstudent@gmail.com'  password='student'`</br>





## Development enviroment Installation 

#### Prerequisites
* mongoDB server installed.
* NodeJs installed.

#### Client installation
* First move into the FRONTEND directory.<br>`cd FRONTEND`</br>
* Then install all the dependencies for the client.<br>`npm install`</br>
* In the same directory run the following command to start the client.<br>`npm start`</br>

#### Server installation
* Now move into the BACKEND directory.<br>`cd BACKEND`</br>
* Then install all the dependencies for the server.<br>`npm install`</br>
* Configure the .env variables as needed (Configure Nodemailer, page sizes, JWT key and etc...).
* In the same directory run the following command to start the server.<br>`npm start`</br>

#### Seed database
* Still in the BACKEND directory, run the following command to seed the database.<br>`node seeder.js`</br>
* This will fill the database with admin and user data.
* Use the following credentials to test the application.<br>`ADMIN: email='admin@gmail.com'  password='admin'`</br><br>`STUDENT: email='student@gmail.com'  password='student'`</br><br>`STUDENT(First time login): email='tempstudent@gmail.com'  password='student'`</br>

Finally open http://localhost:3000 to view it in your browser!


