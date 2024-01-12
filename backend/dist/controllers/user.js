import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
        return next(new Error("Some"));
        const { name, email, photo, _id, dob, gender } = req.body;
        const user = await User.create({
            name,
            email,
            photo,
            _id,
            gender,
            dob: new Date(dob)
        });
        return res.status(201).json({
            success: true,
            message: `Welcome, ${user.name}`
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
};
