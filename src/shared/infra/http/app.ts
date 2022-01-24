import "reflect-metadata"
import "express-async-errors"
import "../../Container"

import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { AppError } from "shared/Errors/appError";

export const app = express()


app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof AppError){

        return res.status(err.statusCode).json({
            message: err.message
        })

    } 

    res.status(500).json({
        message: err.message,
        stack: err.stack
    })

})

