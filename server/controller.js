// TODO: connect to the db
require("dotenv").config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getUserPosts: (req, res) => {
        sequelize.query(`SELECT * FROM user_posts`)
            .then((dbResults) => res.status(200).send(dbResults[0]))
            .catch((err) => console.log(err));
    },
    newUserPost: (req, res) => {
        const {userId, imgURL, date, caption} = req.body

        sequelize.query(`INSERT INTO user_posts (user_info_id, post_image, post_date, post_caption)
            VALUES (${userId}, '${imgURL}', '${date}', '${caption}');`)
            .then((dbResult) => res.status(200).send(dbResult[0]))
            .catch((err) => console.log(err));
    }
}