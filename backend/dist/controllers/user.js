import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
        const { name, email, photo, _id, dob } = req.body;
        const user = await User.create({
            name,
            email,
            photo,
            _id,
            dob: new Date(dob)
        });
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`
        });
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            message: error,
        });
    }
};
