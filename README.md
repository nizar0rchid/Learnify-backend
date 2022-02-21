# Learnify-Backend Server

A backend Server for the Learnify project. REST API implementation with NodeJs, Express and MongoDb
Used bcyptjs to hash passwords, jsonwebtoken to manage authentification and authorization.
Used Multer to upload files.

The api uri preceed all API endpoints and the following endpoints are currently available :

* **GET** /users/ (Get all users)
-----------------------------
* **POST**  /users/register
* **GET**  /users/login
-----------------------------
* **GET** /users/:id  (find user by id)
* **PUT** /users/pic/:id (Change Profile Picture)
* **PUT** /users/:id (update profile)
* **DELETE** /users/:id (delete user)
-----------------------------

