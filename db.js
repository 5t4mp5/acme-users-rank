const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, { logging: true });
const uuid = require("uuid");

const User = db.define("user", {
    name:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    bio:{
        type: Sequelize.TEXT,
        validate:{
            notEmpty: true
        }
    },
    rank:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notNull: true,
            min: 1,
            max: 10
        }
    }
});

module.exports = { db, User };