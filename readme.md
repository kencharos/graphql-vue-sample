# GraphQL Server and vue-apllo client sample

## pre requirements

+ node 8 over.
+ vue-cli 3 (if develop frontend)
+ run `npm i` at frontend and graphql-backend both.

## usage

1. run server `cd graphql-backend`, `node index.js`
2. run frontend `cd frontend`, `npm run serve`

server will run at `http://localhost:3000/graphql`, also use graphiql at `http://localhost:3000/graphiql`

frontend will run at `http://localhost:8080`

## TODO

+ Subscription and Websocket
+ client local cache management, Opsimistic UI.
+ mutation component
+ calling query API without Query Compoment. 
+ validation, error messages.