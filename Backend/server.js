import express from 'express';
import bodyParser from 'body-parser';
import Model from './Model/Model.js'; // Assuming your model file exports the Mongoose model
import cors from 'cors';
const app = express();
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());
app.use(cors())

// Signup endpoint
app.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username is already taken
        const existingUser = await Model.findOne({ username });
        if (existingUser) {
            console.log('Username is already taken');
            return res.json({ success: false, message: 'Username is already taken' });
        }

        // Create a new user using the Model
        const newUser = new Model({ username, password});
        await newUser.save();

        const savedUser = await Model.findOne({username})
        // Respond with success message
        console.log('Signup successful');
        res.json({ success: true, user: savedUser});
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username is already taken
        const existingUser = await Model.findOne({ username });
        if (existingUser) {
            existingUser.isLoggedIn = true;
            await existingUser.save();
        }else{
            prompt("Username not found");
        }
        const savedUser = await Model.findOne({username})
        // Respond with success message
        console.log('LogIn successful');
        res.json({ success: true, user: savedUser });
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/todo', async (req, res) => {
    const { username, todos } = req.body;
    console.log(username);
    try {
        const existingUser = await Model.findOne({username});

        if (existingUser) {
            existingUser.todos = todos;
            await existingUser.save();
            res.json({ success: true, message: 'Todos updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/todo/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await Model.findOne({ username });

        if (user) {
            res.json({ success: true, todos: user.todos,isLoggedIn:user.isLoggedIn });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await Model.findOne({ username });

        if (user) {
            user.isLoggedIn = false;
            await user.save();
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
