![cf](https://i.imgur.com/7v5ASc8.png) lab 11 single resource express api
======

# To Submit this Assignment
  <!-- * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas -->
  * write a question and observation on canvas

# Build Tool Instructions
<!-- * create a package.json that lists all dependencies and developer dependencies -->
<!-- * include an .eslintrc -->
<!-- * include a .gitignore -->
* include a readme with a project description
  * how to install
  * how to start the server
  * document the routes
* include a package.json
  <!-- * have a lint script for running eslint -->
  <!-- * have a test script for running mocha -->
  * start script for running your server
  <!-- * have a start-db script for running mongod
  * have a stop-db script for stoping mongod -->

# Directions
<!-- * Create these directories to organize your code:
 * lib
 * model
 * route
 * db
 * test -->
<!-- * Create a HTTP Server using `express` -->
<!-- * Create a Object Constructor using mongoose that creates a _resource_ with at least 3 properties -->
 <!-- * it can not have the same properties as the in class sample code -->
 <!-- * Also include two other properties of your choice (like name, creationDate, etc.) -->
<!-- * use the `body-parser` express middleware to on `POST` and `PUT` routes -->
* save your data using the storage module with Mongo DB

## Server Endpoints
### `/api/resource-name`
* `POST` request
 * pass data as stringified json in the body of a post request to create a resource

### `/api/resource-name/:id`
* `GET` request
 * pass the id of a resource though the query string to fetch a resource   
* `PUT` request
 * pass data as stringified json in the body of a put request to update a resource
* `DELETE` request
 * pass the id of a resource though the query string to delete a resource   

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/resource-name` endpoint responds as described for each condition below:
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
 * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `POST` - test 400, with an invalid request body

<!-- ## Bonus
* **1pt** a `GET` request to `/api/resource-name` should respond with an array of all of the ids for that resource
 * if you do the bonus you should not test for a 404 for `GET` request with no query, and instead write a test that ensures your a `GET` to `/api/resouce-name` returns a 200 and an array -->
