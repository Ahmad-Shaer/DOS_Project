const sqlite = require('sqlite');

async function main() {
    try {
        // Open a database connection
        const db = await sqlite.open({
            filename: './data.db',
            driver: require('sqlite3').Database
        });

        // Create a table
        await db.run(`CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY,
            Name TEXT,
            cost INTEGER,
            stock INTEGER,
            topic TEXT
        )`);

        // Insert data into the table
        const data = {
            "items": [
                {
                    "id": 1,
                    "Name": "How to get a good grade in DOS in 40 minutes a day",
                    "cost": 20,
                    "stock": 5,
                    "topic": "distributed systems"
                },
                {
                    "id": 2,
                    "Name": "RPC for Noobs",
                    "cost": 40,
                    "stock": 2,
                    "topic": "distributed systems"
                },
                {
                    "id": 3,
                    "Name": "Xen and the Art of Surviving Undergraduate School",
                    "cost": 45,
                    "stock": 8,
                    "topic": "undergraduate school"
                },
                {
                    "id": 4,
                    "Name": "Cooking for the Impatient Undergraduate Student",
                    "cost": 32,
                    "stock": 9,
                    "topic": "undergraduate school"
                }
            ]
        };

        const stmt = await db.prepare('INSERT INTO books (id, Name, cost, stock, topic) VALUES (?, ?, ?, ?, ?)');
        for (const item of data.items) {
            await stmt.run(item.id, item.Name, item.cost, item.stock, item.topic);
        }
        await stmt.finalize();

        // Retrieve and print data from the table
        const rows = await db.all("SELECT * FROM books");
        console.log(rows);

        // Close the database connection
        await db.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
