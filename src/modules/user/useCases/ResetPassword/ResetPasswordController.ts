import {Request, Response} from "express"
import { container } from "tsyringe"
import { ResetPasswordUseCase } from "./ResetPasswordUseCase"

export class ResetPasswordController {

    public async handle(req: Request, res: Response){

        const {token} = req.params

        const {
            newPassword
        } = req.body

        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

        await resetPasswordUseCase.execute(token, newPassword)

        res.status(200).json({
            message: "Password was updated.",
        })
    }
}