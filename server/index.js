require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const {sequelize} = require('./controller')


app.use(cors());
app.use(express.json());

const {getUserPosts, registerNewUser, newUserPost, putProfileImage} = require("./controller.js")


app.get("/posts", getUserPosts);

app.post("/register", registerNewUser);

app.post("/posts", newUserPost);

// how do I set up endpoint for a specific user's profile?
app.put("/users/:id", putProfileImage);

sequelize.authenticate()
app.listen(port, () => console.log(`Jammin on ${port}`));
