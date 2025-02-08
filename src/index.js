const express = require('express');
const app = express();
const port = 3000;
const {v4: uuidv4}=require('uuid');

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users = [];
app.post('/users', (req, res) => {
    const {name, email}=req.body;
    
    //check
    if (!name || !email){
        return res.status(400).json({error: 'Need name and email'});
    }

    const newUser={
        id: uuidv4(),
        name,
        email,
    };
  
    users.push(newUser);
    return res.status(201).json(newUser);
});
  

app.delete('/users/:id', (req, res) => {
    const { id }=req.params;
    const userIndex=users.findIndex(u => u.id===id);

    if (userIndex === -1) {
        return res.status(404).json({error: 'User not found'});
    }
    users.splice(userIndex, 1);
    return res.sendStatus(204);
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing