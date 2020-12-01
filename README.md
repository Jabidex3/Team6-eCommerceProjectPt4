# Full Stack E-commerce Application
## Description
Users can register an account, shop and add products to their cart, enter their billing information, and receive an invoice containing all of the relevant information. Admin users can perform basic CRUD operations to modify the product inventory.

## Technologies
* Angular client
* Node with Express server
* MySQL local database connection

## Running the application

> Quick commands
>  1. ```nodemon server```
>  2. ```npm start```
<br>

### A. Setting up the database in MySQL Workbench

   1. Set up a localhost connection in MySql Workbench on ```port 3306```

   2. Update the connection username and password fields in the backend ```config.json file```
   
   3. Run the script in ```eCommerceProject2 Database Script.sql``` in MySql Workbench

### B. Running the backend Node server

1. In the ```backend``` folder, install dependencies via ```npm install```
2. Input ```nodemon server``` in the terminal to run the server on ```port 3000```. Any server development changes will automatically restart the node application.

### C. Running the client Angular application

1. In the ```frontend``` folder, install dependencies via ```npm install```
2. Run ```npm start``` to run the application on ```localhost:4200```

## Team
* [Jabid Methun](https://github.com/Jabidex3)
* [Joshua Anderson]()
* [Natasha Ng](https://github.com/natashang) : UI, documentation