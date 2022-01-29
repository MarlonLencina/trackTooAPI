import {Request, Response} from "express"
import { container } from "tsyringe"
import { UpdateInfoUseCase } from "./updateInfoUseCase"

export class UpdateInfoController {

    public async handle(req: Request, res: Response){

        const {user_id} = req 
        const {
            name,
            last_name,
            email,
            password
        } = req.body    

        const updateInfoUseCase = container.resolve(UpdateInfoUseCase)

        const user = await updateInfoUseCase.execute({user_id, name,
            last_name,
            email,
            password})

        res.json({
            message: "User was succesfully updated.",
            user
        })

    }

}