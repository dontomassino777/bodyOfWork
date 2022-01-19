require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const {getUserPosts, newUserPost} = require("./controller.js")

// what is the correct endpoint URL needed here?
app.get("/posts", getUserPosts);

app.post("/posts", newUserPost);

// app.get(“/endpoint”, getFunction);
// app.delete(“/endpoint/:id”, deleteFunction);
// app.post(“/endpoint”, createFunction);
// app.put(“/endpoint/:id”, updateFunction);

app.listen(port, () => console.log(`Jammin on ${port}`));
