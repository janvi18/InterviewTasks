const userModel = require('../model/userModel');

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = new userModel({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        next(err);
    }
};

// get all users

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
}


