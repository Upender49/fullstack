const express = require('express');
const app = express();

app.use(express.json()); // to read JSON body

let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];


// ✅ CREATE (POST)
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.json(newUser);
});


// ✅ READ ALL (GET)
app.get('/users', (req, res) => {
    res.json(users);
});


// ✅ READ ONE (GET by ID)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});


// ✅ UPDATE (PUT)
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json(user);
});


// ✅ DELETE (DELETE)
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send('User deleted');
});


// Start server
app.listen(2000, () => {
    console.log('Server running at http://localhost:2000');
});