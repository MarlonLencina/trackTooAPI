import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTracksByUserUseCase } from "./getAllTrackByUserUseCase";


export class GetTrackByUserController {


    public async handle (req: Request, res: Response) {

        const {user_id} = req

        const getTracksByUserUseCase = container.resolve(GetTracksByUserUseCase)

        const tracks = await getTracksByUserUseCase.execute(
            user_id
        )

        res.status(201).json({
            tracks
        })

    }   

}
