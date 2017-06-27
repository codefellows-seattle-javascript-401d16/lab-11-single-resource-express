# Seahawk Player REST API  

## Install  
- To install my API you can do so by cloning this repo:
```
git clone https://github.com/SpenGietz/lab-11-single-resource-express.git
```
- To add this to your own project:
```
npm i -S lab11-spencer
```

## Commands  

### npm run start-db  
- This will start the database that is required by the API  

### npm run stop-db  
- This will stop the database when you are done  

### npm lint  
- This will run your linter through this modules code  

### npm test  
- This will run all of the tests I've written to confirm everything is working properly  

### npm start  
- This will run the server and it will be ready for API requests  

## Routes  

### /api/seahawks  
- This route accepts POST GET PUT and DELETE requests  

#### POST  
- You can add Seahawk players to the database by posting JSON in the following format. It will respond with the added player  
```
{
  "name": "Some Dude",
  "height": "6\"8",
  "weight": 250,
  "position": "Quarterback",
  "picture": "link/to/pic.jpg"
}
```

#### GET  
- A GET request to plain old /api/seahawks will return an array of all the players in the database  
- A GET request in the format /api/seahawks/playerid will respond with the information for the player with the ID of playerid in the database  

#### PUT  
- You can update players by sending a PUT request to /api/seahawks/playerid with the updated info as JSON in the following format:  
```
{
  "name": "Some Dude",
  "height": "6\"8",
  "weight": 250,
  "position": "Wide Receiver",
  "picture": "link/to/pic.jpg"
}
```

#### DELETE  
- You can delete players from the database by sending a request to /api/seahawks/playerid  

### /api/*
- Any other route will respond with a 404
