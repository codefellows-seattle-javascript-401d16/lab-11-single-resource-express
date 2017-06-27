## Single Resource Express API_URL

To install, you simply npm -i which will install all dependencies, which include the following:
mongoose, mongoDB, express, dotenv, superagent, mocha, and expect.

Once installed, to start the database, you simply run npm run start-db.  To end it, npm run stop-db.

You are able to run tests with mocha and expect by running npm test.  This will automatically start and stop the server before and after the tests run.

The routes included are as follows:
To retrieve all ids on the database in an array, a GET request to /api/records/

To retrieve an individual record by id, a GET request to /api/records/:id

To add a new record to the database, a POST request to the /api/records/:id

To update a record that currently exists in the database, a PUT request to /api/records/:id

To delete a record from the database, a DELETE request to the /api/records/:id
