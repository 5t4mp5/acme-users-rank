const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = db.define("user", {
    name:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        },
        unique: {
            args: true,
            msg: "User name already in use!"
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
            isInt: true,
            min: 1,
        }
    }
});

module.exports = { db, User };