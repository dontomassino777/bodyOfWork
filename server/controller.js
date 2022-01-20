// TODO: connect to the db
require("dotenv").config();
const bcrypt = require('bcrypt')
const {CONNECTION_STRING} = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
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
    registerNewUser: async (req, res) => {
        const {firstName, lastName, emailAddress, username, password, date} = req.body
        const checkUsername = await sequelize.query(`
        SELECT * FROM user_info
        WHERE user_name = '${username}';`)
        if (checkUsername[1].rowCount !== 0) {
            res.status(500).send("Username already exists")
        } else {
            const salt = bcrypt.genSaltSync(10)
            const passwordHash = bcrypt.hashSync(password, salt)
            await sequelize.query(`
            INSERT INTO user_info (user_name, first_name, last_name, email_address, user_pw)
            VALUES (
                '${username}', 
                '${firstName}', 
                '${lastName}', 
                '${emailAddress}', 
                '${passwordHash}'
                );`)
            const userInfo = await sequelize.query(`
            SELECT user_info_id, first_name, last_name, user_name FROM user_info
            WHERE user_name = '${username}';
            `)
            res.status(200).send(userInfo)
        }
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
    },
    sequelize
}
