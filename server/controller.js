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
    newUser: (req, res) => {
        const {userName, firstName, lastName, emailAddress, userPw, date} = req.body

        sequelize.query(`INSERT INTO user_info (user_name, first_name, last_name, email_address, user_pw, signup_date)
            VALUES ('${userName}', '${firstName}', '${lastName}', '${emailAddress}', '${userPw}', '${date}');`)
            .then((dbResult) => res.status(200).send(dbResult))
            .catch((err) => console.log(err));
    },
    newUserPost: (req, res) => {
        const {userId, imgURL, date, caption} = req.body

        sequelize.query(`INSERT INTO user_posts (user_info_id, post_image, post_date, post_caption)
            VALUES (${userId}, '${imgURL}', '${date}', '${caption}')
            RETURNING *;`)
            .then((dbResult) => res.status(200).send(dbResult[0]))
            .catch((err) => console.log(err));
    },
    putProfileImage: (req, res) => {
        const {userName, imgURL} = req.body

        sequelize.query(`INSERT INTO user_info (profile_image)
        VALUES ('${imgURL}')
        WHERE user_name = '${userName}';`)
        .then((dbResult) => res.status(200).send(dbResult[0]))
        .catch((err) => console.log(err));
    }
}