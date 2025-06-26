const express = require('express');
const { Task } = require('../models/Task');
const { validateTask } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// @route   GET /api/v1/tasks
// @desc    Get all tasks for authenticated user
// @access  Private
router.get('/', (req, res, next) => {
    try {
        const { completed, priority, search } = req.query;
        let userTasks = Task.findByUserId(req.user.id);

        // Apply filters
        if (completed !== undefined) {
            userTasks = userTasks.filter(task => 
                task.completed === (completed === 'true')
            );
        }

        if (priority) {
            userTasks = userTasks.filter(task => task.priority === priority);
        }

        if (search) {
            userTasks = userTasks.filter(task => 
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort by creation date (newest first)
        userTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            success: true,
            count: userTasks.length,
            data: userTasks
        });
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/v1/tasks
// @desc    Create new task
// @access  Private
router.post('/', validateTask, (req, res, next) => {
    try {
        const task = Task.create(req.body, req.user.id);
        
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/v1/tasks/:id
// @desc    Get specific task
// @access  Private
router.get('/:id', (req, res, next) => {
    try {
        const task = Task.findById(req.params.id, req.user.id);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/v1/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', validateTask, (req, res, next) => {
    try {
        const updatedTask = Task.updateById(req.params.id, req.user.id, req.body);
        
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        res.json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', (req, res, next) => {
    try {
        const deletedTask = Task.deleteById(req.params.id, req.user.id);
        
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        res.json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;