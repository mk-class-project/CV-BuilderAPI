import CV from '../models/cv.model';
import User from '../models/user.model';

// Create a new CV and link it to a user
export const createCV = async (req, res) => {
    const { sections } = req.body;
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send("User ID must be provided.");
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        const newCV = new CV({
            user: userId,
            sections
        });

        const savedCV = await newCV.save();
        user.cvs.push(savedCV._id); // Add the new CV to the user's cvs array
        await user.save();

        res.status(201).send(savedCV);
    } catch (error) {
        res.status(500).send("Error creating CV: " + error.message);
    }
};

// Update an existing CV
export const updateCV = async (req, res) => {
    const { sections } = req.body; // Assuming sections are passed in the request body
    const { cvId } = req.params; // cvId is passed as a URL parameter

    if (!cvId) {
        return res.status(400).send("CV ID must be provided.");
    }

    try {
        const cv = await CV.findById(cvId);
        if (!cv) {
            return res.status(404).send("CV not found.");
        }

        cv.sections = sections;
        const updatedCV = await cv.save();

        res.status(200).send(updatedCV);
    } catch (error) {
        res.status(500).send("Error updating CV: " + error.message);
    }
};

// Get all CVs for a specific user
export const getUserCVs = async (req, res) => {
    const { userId } = req.params; // Assuming user ID is passed as a URL parameter

    if (!userId) {
        return res.status(400).send("User ID must be provided.");
    }

    try {
        const user = await User.findById(userId).populate('cvs');
        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.status(200).send(user.cvs);
    } catch (error) {
        res.status(500).send("Error retrieving CVs: " + error.message);
    }
};
