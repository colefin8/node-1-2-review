require("dotenv").config();
const express = require("express");
const { SERVER_PORT } = process.env;
const ctrl = require("./controller");
//# app is the instance of our express server
const app = express();

//# Top level middleware - functions that run before any endpoint is hit
app.use(express.json());
//# Endpoints - full CRUD create read update delete
//# RESTful endpoints - a convention for naming endpoints
//#in an express endpoint the first argument is the url that the endpoint is looking for, second argument is the function that runs


//# 3 types of sending information on endpoints: queries, parameters, body
app.get("/api/pokemon", ctrl.getPokemon);
//# body for post request should look like: {name: "", type: "", nickname: ""}
app.post("/api/pokemon", ctrl.addPokemon);
app.put("/api/pokemon", ctrl.editPokemon);
app.delete("/api/pokemon", ctrl.deletePokemon);
//# app.delete('api/pokemon/:name', ctrl.addPokemon)

const port = SERVER_PORT;
app.listen(port, () => {
  console.log(`server is connected on port ${port}`);
});
