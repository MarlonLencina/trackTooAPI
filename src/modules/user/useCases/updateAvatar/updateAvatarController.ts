import {Request, Response} from "express"
import { container } from "tsyringe"
import { UploadAvatarUseCase } from "./updateAvatarUseCase"

export class UploadAvatarController {

    public async handle(req: Request, res: Response){

        const {user_id} = req 
        const file = req.file

        const uploadAvatarUseCase = container.resolve(UploadAvatarUseCase)

        const user = await uploadAvatarUseCase.execute({user_id, file})

        res.json({
            user
        })

    }

}