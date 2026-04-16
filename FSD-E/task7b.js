const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Sample REST API data
const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
];

// Route to render EJS
app.get('/users', (req, res) => {
    res.render('users', { users: users });
});
app.post('/users',(req,res)=>{
    console.log(req);
    const newuser = {
        id : users.length + 1,
        name : req.body.name,
        email : req.body.email
    }
    users.push(newuser);
    res.redirect('/users');
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/users');
});