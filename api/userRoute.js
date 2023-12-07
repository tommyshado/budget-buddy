import { Router } from 'express';
import db from '../model/db'; // Adjust the path based on your project structure
import { getUserDetailsById } from '../services/userService'; // Assuming you have a service for user-related operations

const userRouter = Router();

userRouter.get("/profile", async (req, res) => {
    // Check if the user is authenticated
    if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        // Retrieve user information from the database using the stored user ID from the session
        const userId = req.session.userId;
        const userDetails = await getUserDetailsById(db, userId);

        if (!userDetails) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with the user information (excluding sensitive data like password)
        res.json({
            username: userDetails.username,
            email: userDetails.email,
            // ... include other user details you want to share
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default userRouter;
