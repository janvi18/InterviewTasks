const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user
router.post('/users', userController.createUser);

// Update a user
router.put('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);

// get all users
router.get('/users', userController.getAllUsers);

module.exports = router;
