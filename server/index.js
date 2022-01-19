const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  // When we want to be able to accept JSON.

// const {getFunction, deleteFunction, createFunction, updateFunction} = require(“./controller.js”)

// app.get(“/endpoint”, getFunction);
// app.delete(“/endpoint/:id”, deleteFunction);
// app.post(“/endpoint”, createFunction);
// app.put(“/endpoint/:id”, updateFunction);

app.listen(4040, () => console.log('Server running on 4040'))
