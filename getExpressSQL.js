const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

const {
    MYSQL_HOST: host,
    MYSQL_PORT: port,
    MYSQL_USERNAME: username,
    MYSQL_PASSW0RD: password,
    MYSQL_DATABASE: database,
} = process.env;

const getENV = (type) => {
    switch (type) {
        case "host":
            return host;
        case "port":
            return port;
        case "username":
            return username;
        case "password":
            return password;
        case "database":
            return database;
        default:
            break;
    }
};

const connectToDB = () => {
    return mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database,
    });
};

module.exports = {
    getENV,
    connectToDB,
};
