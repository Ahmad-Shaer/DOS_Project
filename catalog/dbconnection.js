const sqlite = require('sqlite');

let db;

async function connectDatabase() {
    if (!db) {
        db = await sqlite.open({
            filename: './data.db',
            driver: require('sqlite3').Database
        });
    }
    return db;
}

module.exports = {
    connectDatabase
};
