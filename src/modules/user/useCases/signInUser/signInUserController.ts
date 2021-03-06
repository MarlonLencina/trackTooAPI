import {Request, Response} from "express"
import { SignInUserUseCase } from "./signInuseCase"
import { container } from "tsyringe"

export class SignInUserController {

    public async handle(req: Request, res: Response){

        const {
            email,
            password
        } = req.body

        const signInUserUseCase = container.resolve(SignInUserUseCase)

        const {user, token, refreshToken} = await signInUserUseCase.execute({
            email, password
        })

        res.status(201).json({
            message: "User succesfully logged in.",

            token,
            refreshToken,
            user
        })


    }

}