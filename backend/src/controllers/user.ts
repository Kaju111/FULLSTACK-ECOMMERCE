import { NextFunction, Request, Response, response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/type.js";

export const newUser = async (
    req:Request <{},{}, NewUserRequestBody>,
    res:Response ,
    next:NextFunction
    ) =>{
    try {
        const {name,email,photo,_id,dob} = req.body;

        const user = await User.create({
            name,
            email,
            photo,
            _id,
            dob: new Date(dob)
        })

        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}` 
        })

    } catch (error) {
        return res.status(200).json({
            success: false,
            message:error,
        })
    }
}

