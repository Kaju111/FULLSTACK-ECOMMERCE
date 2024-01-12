import express, { NextFunction, Request, Response } from "express"

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction)=> {

    err.message ||= "Internal server error";

    return res.status(400).json({
        success: false,
        message: err.message
    })
}
