import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = req.body;  
        // Chiffrer le mot de passe      
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        const response = await User.create(user);

        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUserById = async (req, res) => {
    const { _id, password: currentPassword, newPassword, ...updateData } = req.body;

    try {
        const user = await User.findById(_id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            updateData.password = hashedPassword;
        }

        if (!newPassword) {
            delete updateData.password;
        }

        const updatedUser = await User.findByIdAndUpdate(_id, updateData, { new: true });
        const { password, ...userWithoutPassword } = updatedUser.toObject();
        
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};