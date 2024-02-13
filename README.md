 <h2>Let’s slice & dice</h2>

Description
This project implements a micro-service to derive simplified summary statistics (mean, min, max) on a dataset. It provides APIs to add records, delete records, and fetch summary statistics for salary based on various criteria.
Installation

    Clone the repository: git clone <repository-url>
    Navigate to the project directory: cd <project-directory>
    Install dependencies: npm install

Usage

    Start the server: npm start
    Access the APIs using the following endpoints:

Endpoints

    POST /addRecord: Add a new record to the dataset.
    DELETE /deleteRecord: Delete a record from the dataset.
    GET /summaryStatistics/all: Fetch summary statistics for salary over the entire dataset.
    GET /summaryStatistics/onContract: Fetch summary statistics for salary for records which satisfy "on_contract": "true".
    GET /summaryStatistics/department: Fetch summary statistics for salary for each department.
    GET /summaryStatistics/departmentSubDepartment: Fetch summary statistics for salary for each department and sub-department combination.

Authentication

    The /addRecord and /deleteRecord endpoints are protected with JWT authentication.
    To generate a JWT token, make a POST request to /getAccess with the username and password in the request body.
    Example: POST /getAccess, body: { "username": "Harsh Vardhan Gupta", "password": "Harsh" }

Environment Variables

    ACCESS_TOKEN_SECRET: Secret key for signing JWT tokens.

Tests

    Run tests: npm test

Technologies Used
Node.js
Express.js
JSON Web Tokens (JWT)

Some Basic Implementation of the APIS:-
0. Get Access:-
     Request :-GET
     URL :- http://localhost:3000/api/AccessAllow
     JSON:- 
     {
    "username":"Harsh Vardhan Gupta",
    "password":"Harsh"
}
     
1. Add Record:-
     Request :-POST
   TOKEN:- BEARER
     URL :-  http://localhost:3000/api/addRecord
     JSON:- 
[{
"name": "Abhishek",
"salary": "145000",
"currency": "USD",
"on_contract": "false",
"department": "Engineering",
"sub_department": "Platform"
},
{
"name": "Anurag",
"salary": "90000",
"currency": "USD",
"department": "Banking",
"on_contract": "true",
"sub_department": "Loan"
},
{
"name": "Himani",
"salary": "240000",
"currency": "USD",
"department": "Engineering",
"sub_department": "Platform"
},
{
"name": "Yatendra",
"salary": "30",
"currency": "USD",
"department": "Operations",
"sub_department": "CustomerOnboarding"
},
{
"name": "Ragini",
"salary": "30",
"currency": "USD",
"department": "Engineering",
"sub_department": "Platform"
},
{
"name": "Nikhil",
"salary": "110000",
"currency": "USD",
"on_contract": "true",
"department": "Engineering",
"sub_department": "Platform"
},
{
"name": "Guljit",
"salary": "30",
"currency": "USD",
"department": "Administration",
"sub_department": "Agriculture"
},
{
"name": "Himanshu",
"salary": "70000",
"currency": "EUR",
"department": "Operations",
"sub_department": "CustomerOnboarding"
},
{
"name": "Anupam",
"salary": "200000000",
"currency": "INR",
"department": "Engineering",
"sub_department": "Platform"

3. Delete
     Request:-DELETE
   Token:-BEARER
   URL:-http://localhost:3000/api/deleteRecord
   JSON:-
   {
      "name":"Guljit"
     } //Path Variable can be used!!
   
4. Contract Summart
    Request:- GET
   URL:- http://localhost:3000/api/summaryStatistics/onContract

5. Statics All
   Request:- GET
   URL:- http://localhost:3000/api/summaryStatistics/all
6. DepartMent
    Request:- GET
   URL:-http://localhost:3000/api/summaryStatistics/department
7. Sub Department Query:-
    Request:- GET
   URL:-http://localhost:3000/api/summaryStatistics/departmentSubDepartment

<h2>Author</h2>
<h1>Harsh Vardhan Gupta</h1>
