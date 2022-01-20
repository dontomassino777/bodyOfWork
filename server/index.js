require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const {getUserPosts, newUser, newUserPost, putProfileImage} = require("./controller.js")


app.get("/posts", getUserPosts);

app.post("/users", newUser);
app.post("/posts", newUserPost);

// how do I set up endpoint for a specific user's profile?
app.put("/users/:id", putProfileImage);


app.listen(port, () => console.log(`Jammin on ${port}`));
