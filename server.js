const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const app = express();
app.use(express.json());
dotenv.config(); 


let connectDB = async function () {
    try {
        mongoose.connect('mongodb://localhost:27017/task');
        console.log('server is connect')
    } catch (error) {
        console.log('u have error')
    }   
} 
connectDB();

const taskSchema = new mongoose.Schema({
    title:  String ,
    description:  String ,
    status:  Boolean ,
    createdAt:  Date  
});
    
const Task = mongoose.model("Task", taskSchema)

app.post('/tasks', async (req, res) => {
    try {
        const task = await  new Task(req.body); 
        task.save(); 
        res.status(201).send(task); 
    } catch (error) {
        res.status(400).send(" error: error.message ");
    }
});


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.send(tasks); 
    } catch (error) {
        res.status(500).send("error: error.message ");
    }
});


app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); 
        if (!task) return res.status(404).send({ error: 'Task not found' });
        res.send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.patch('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) return res.status(404).send({ error: 'Task not found' });
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send({ error: 'Task not found' });
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send("{ error: error.message }");
    }
});




app.get('/', (req, res) => {
    res.send('Welcome to Task Manager API');
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

