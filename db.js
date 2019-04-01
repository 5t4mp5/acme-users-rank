const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = db.define("user", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: { error: "Please enter a name" }
        },
        unique: {
            args: true,
            msg: "User name already in use"
        }
    },
    bio:{
        type: Sequelize.TEXT,
        validate:{
            notEmpty: { error: "Please enter some bio text" }
        }
    },
    rank:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notNull: { error: "Please enter a rank" },
            isInt: { msg: "Rank must be a number" },
            min: { args: 1, msg: "Rank must be greater than 1"}
        }
    }
});

module.exports = { db, User };