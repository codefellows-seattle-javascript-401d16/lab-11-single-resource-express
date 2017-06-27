# SofaServer

## Installing the SofaServer
`git clone [repository]`
`npm i`

## Starting the SofaServer
`npm start`

## Sofa Records
Sofas must have:
`material`: `String` - required. One of 'leather', 'cloth', or 'wicker'. Other materials are rejected.
`colors`: `[String]` - required. Colors the sofa is available in. All colors are acceptable.
`price`: `Number` - required. The price of the sofa.
`discount`: - not required. Information about discounts.
  `price`: `Number` - must be lower than the regular price.
  `endDate`: `Date` - must be in the future.

Sofa records are validated at creation and update. Invalid sofas will be rejected.

## Interacting with the SofaServer
API endpoint: `/api/sofas`

`GET /api/sofas`: retrieve a list of sofa ids
`POST /api/sofas`: add a sofa to the database
`GET /api/sofas/:id`: get a sofa from the database
`PUT /api/sofas/:id`: modify a sofa. Need only include the partial record to be modified in the body.
`DELETE /api/sofas/:id`: delete a sofa

## Testing the SofaServer
`npm test`
Includes Istanbul code coverage + Mocha testing with Expect assertions.
