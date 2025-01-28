const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Users = require('./Models/Users');
const Tasks = require('./Models/Tasks');
const port = process.env.PORT || 3002;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS for all routes



//Add a new user
app.post('/users', async(req, res) => {
    try{
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:err.message});
    }
});

// Add a new task
app.post('/tasks', async(req, res) => {
    try{
        const newTask = await Tasks.create(req.body);
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

//Get all users
app.get('/users', async(req, res) => {
    try{
        const users = await Users.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get a specific user
app.get('/users/:id', async(req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get all tasks
app.get('/tasks', async(req, res) => {
    try{
        const tasks = await Tasks.find();
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get a specific task
app.get('/tasks/:id', async(req, res) => {
    try{
        const task = await Tasks.findById(req.params.id);
        if(task){
            res.status(200).json(task);
        }else{
            res.status(404).json({message:"Task not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Edit an existing user
app.put('/users/:id', async(req, res) => {
    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(user){
            const updatedUser = await Users.findById(req.params.id);
            res.status(200).json(updatedUser);
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Edit an existing task
app.put('/tasks/:id', async(req, res) => {
    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(task){
            const updatedTask = await Tasks.findById(req.params.id);
            res.status(200).json(updatedTask);
        }else {
            res.status(404).json({message: "Task not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// Delete a user
app.delete('/users/:id', async(req, res) => {
    try{
        const user = await Users.findByIdAndDelete(req.params.id);
        if(user){
            res.status(204).send();
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Delete a task
app.delete('/tasks/:id', async(req, res) => {
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if(task){
            res.status(204).send();
        }else{
            res.status(404).json({message:"Task not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// Start the server
mongoose.connect('mongodb+srv://sachaloeb:xfBD6K8Vpm6GTmNx@cluster0.3fjol.mongodb.net/StuddyBuddyDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }).catch(err => console.error('Could not connect to MongoDB', err));
