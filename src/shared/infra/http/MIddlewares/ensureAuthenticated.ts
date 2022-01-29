import { jwtconfig } from "@config/jwt.config"
import {
    Request, NextFunction, Response
} from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "shared/Errors/appError"

interface jwtPayload {
    sub: string;
}

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.headers.authorization

    if(!accessToken){
        throw new AppError("token is missing.", 401)
    }

    const [_, token] = accessToken.split(" ")

    try {
         
    const {sub} = verify(token, jwtconfig.secret) as jwtPayload
    req.user_id = sub
    next()

    } catch (error) {

        throw new AppError(error.message, 401)
        
        
    }

}
