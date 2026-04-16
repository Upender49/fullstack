const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

async function run() {

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("ummeshDB");
    const users = db.collection("users");

    // ✅ CREATE
    await users.insertMany([
        { name: "Alice", email: "alice@example.com", age: 25 },
        { name: "Bob", email: "bob@example.com", age: 30 },
        { name: "Alice", email: "alice@example.com", age: 25 },
        { name: "Bob", email: "bob@example.com", age: 30 }
    ]);
    console.log("Users inserted");

    // ✅ READ
    const allUsers = await users.find().toArray();
    console.log("All Users:", allUsers);

    // ✅ UPDATE
    await users.updateOne(
        { name: "Alice" },
        { $set: { age: 28 } }
    );
    console.log("User updated");

    // ✅ DELETE
    await users.deleteOne({ name: "Bob" });
    console.log("User deleted");

    // Final data
    const finalUsers = await users.find().toArray();
    console.log("Final Users:", finalUsers);

    await client.close();
}

run();
