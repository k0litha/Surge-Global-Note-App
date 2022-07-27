# Surge Global Internship Assignment 

A simple note taking web application built using React.Js, Node.Js, Express.Js and MongoDB. This application satisfies almost all the requirements such as proper error handling, role-based authentication with JWT, private user routes, backend pagination with frontend page numbering and many others. 

Notes are displayed as cards with cleaner and simple looking user interface. A student user can create, update or delete notes as they wish. An admin user can view the list of users in the database with their full details. An admin user also can create a student user and the server will automatically send the credentials to the corresponding email address.


## Installation 

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



## Answers for questionnaire

1. Explaining what design pattern is and how we can use design patterns in projects
<br>Design patterns are basically a generally applicable coding template that can be used to solve coding problems in software development. While its not mandatory to use design pattern to solve an issue, using them will make our code more manageable, reusable and more flexible. So, if we use design patterns in our software developments, we will be able to find and solve the issues easier.</br>

2. What is DTO and explain the use of it.
<br>DTO stands for data transfer object. It is design pattern that mainly use for transfer encapsulated data between two systems. The main advantage of it is, it will reduce the number of function call between systems.</br>  

3. How are you going to store secrets in an application without exposing it to the internet?
<br>We can use environment variables to store our secrets if possible. Because it’s not and object bound to the application source code. Otherwise, we can use a secret management service which will safely store our secrets encrypted.</br>

4. What is JWT and how does it work?
<br>JWT stands for JSON Web Token is an open standard that has been utilized to securely and safely exchange information between two endpoints. These two end points mostly will be a client and a server. The main purpose of this standard is not to hide the data from public, but to verify the authenticity of the data. They are signed using a cryptographic algorithm, so the information inside the token can not be altered in any way.</br> 

5. What is the difference between SQL and NoSQL databases? 
<br>SQL stands for Structured Query Language is the main language to work with the relational databases. It requires a fixed schema in form the form of tables which includes rows and columns. On the other hand, NoSQL means non-relational databases. These type of database does not require a fixed schema, so they are easy to scale.</br>

6. Suggest a good state management for frontend application and explain why you recommend it.
<br>As for my experience in React Js, useState Hook is the first and best choice to local state management. Because its much easier to work with and has fewer numbers of lines of codes. But if you want a large-scale global state management solution like Redux will be a better choice.</br>


