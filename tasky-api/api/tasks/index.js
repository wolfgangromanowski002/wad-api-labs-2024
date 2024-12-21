import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import { tasksData } from './tasksData';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(tasksData);
});


// Get task details
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

//Add a task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;
    const currentTimestamp = new Date().toISOString();
    
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: currentTimestamp,
        updated_at: currentTimestamp
    };
    
    tasksData.tasks.push(newTask);
    tasksData.total_results++;
    res.status(201).json(newTask);
});


//Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id); 
    if (taskIndex === -1) {
    return res.status(404).json({ status: 404, message: 'Task not found' });}
    
    const currentTimestamp = new Date().toISOString();
    const updatedTask = { 
        ...tasksData.tasks[taskIndex], 
        ...req.body, 
        id: id, 
        updated_at: currentTimestamp };
    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});


//Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });}
    tasksData.tasks.splice(taskIndex, 1);
    tasksData.total_results--;
    res.status(204).send();
});


export default router;
