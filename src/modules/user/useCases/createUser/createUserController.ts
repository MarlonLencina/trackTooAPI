import {Request, Response} from "express"
import { CreateUserUseCase } from "./createUserUseCase"
import { container } from "tsyringe"

export class CreateUserController {

    public async handle(req: Request, res: Response){

        const {
            email,
            name,
            last_name,
            password
        } = req.body

        const createrUserUseCase = container.resolve(CreateUserUseCase)

        const user = await createrUserUseCase.execute({
            email, name, last_name,password
        })

        res.status(201).json({
            message: "User was created successfully.",
            user
        })


    }

}