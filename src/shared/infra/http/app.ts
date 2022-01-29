import "reflect-metadata"
import "express-async-errors"
import "../../Container"
import 'dotenv/config'

import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { AppError } from "shared/Errors/appError";
import cors from 'cors'
import path from 'path'

export const app = express()
const staticFiles = path.resolve(__dirname, 'public')

app.use("/public", express.static(staticFiles));

app.use(cors())
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

