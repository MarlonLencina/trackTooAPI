import {Request, Response} from "express"
import { SendForgotPasswordUseCase } from "./sendForgetPasswordUseCase"
import { container } from "tsyringe"

export class SendForgotPasswordController {

    public async handle(req: Request, res: Response){

        const {
            email
        } = req.body

        const sendForgotPasswordUseCase = container.resolve(SendForgotPasswordUseCase)

        const {token} = await sendForgotPasswordUseCase.execute(
            email
        )

        res.status(201).json({
            token,
            message: "Token was succesfully sent.",
        })


    }

}