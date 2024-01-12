import { NextFunction, Request, Response  } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/type.js";

export const newUser = async (
    req:Request <{},{}, NewUserRequestBody>,
    res:Response ,
    next:NextFunction
    ) =>{
        try {
            return next(new Error("Some"))
        const {name,email,photo,_id,dob,gender} = req.body;

        const user = await User.create({
            name,
            email,
            photo,
            _id,
            gender,
            dob: new Date(dob)
        })

        return res.status(201).json({
            success: true,
            message: `Welcome, ${user.name}` 
        })

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message:error,
        })
    }
}

