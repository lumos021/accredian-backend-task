# Accredian Backend Task

## Overview
This repository contains the backend code for the Accredian Full Stack Developer Intern Task. It includes RESTful APIs for user authentication, including login and sign-up functionalities, and is designed to connect with a MySQL database.

## Features
- RESTful API endpoints for user login and sign-up.
- Express.js framework for the backend server.
- Connectivity with a MySQL database for storing user information.
- Password encryption for secure data handling.
- Error handling for scenarios such as invalid credentials and duplicate email during sign-up.

## Installation
To set up the project locally, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/lumos021/accredian-backend-task.git
```
2.Navigate to the project directory:
```bash
cd accredian-backend-task
```
3.Install the necessary dependencies:
```bash
npm install
```
or if you are using Yarn:
```bash
yarn install
```
## API Endpoints

The backend server provides the following RESTful API endpoints:

### `GET /`
- **Description**: Test endpoint to confirm the API is working.
- **Response**: A simple string message "Api Working !".

### `POST /register`
- **Description**: Endpoint to register a new user.
- **Body**:
  - `username`: The username of the new user (mandatory).
  - `email`: The email address of the new user (mandatory).
  - `password`: The password for the new user (mandatory).
- **Response**: A JSON object containing the status of the registration and any relevant messages.

### `POST /login`
- **Description**: Endpoint to authenticate an existing user.
- **Body**:
  - `usernameOrEmail`: The username or email address of the user (mandatory).
  - `password`: The password of the user (mandatory).
- **Response**: A JSON object containing the status of the login attempt, user information if successful, and any relevant messages.

These endpoints are designed to facilitate user authentication processes, including user registration and login, and are connected to a MySQL database for data persistence.


## Configuration
Update the index.js file with your MySQL database configuration as necessary:
```bash
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'accred'
});
```

## Running the Server
To start the server, run:
```bash
npm start
```
The server will be running on http://localhost:5000.

## Database
The MySQL database file is exported in .sql format and can be found in the repository.

## Contribution
If you would like to contribute to this project, please fork the repository and submit a pull request.

## Acknowledgments
Thanks to the Accredian team for providing the opportunity to work on this task.