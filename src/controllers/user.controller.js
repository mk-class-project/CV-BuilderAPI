import User from '../models/user.model.js';

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
        const user = await User.create(req.body);

        // Chiffrer le mot de passe
        user.password = await bcrypt.hash(user.password, process.env.SALT_ROUNDS);
        await user.save();
        const response = await User.create(user);
                          
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUserById = async (req, res) => {
    try {

        const updatedUser = req.body;
        const user = await User.findById(req.body._id);

        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Si le mot de passe est inclus dans la requête, le chiffrer
        if (bcrypt.compare(updatedUser.password, user.password)) {
            const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);
            req.body.password = hashedPassword;

            const response = await User.findByIdAndUpdate(req.body._id, req.body);
        }else{
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.json(user);
    } catch (error) {
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