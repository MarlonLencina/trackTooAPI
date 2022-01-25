import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTrackByIdUseCase } from "./getTrackIdUseCase";


export class GetTrackByIdController {


    public async handle (req: Request, res: Response) {

        const {user_id} = req

        const {
            track_id
        } = req.params


        const getTrackByIdUseCase = container.resolve(GetTrackByIdUseCase)

        const track = await getTrackByIdUseCase.execute(
            track_id, user_id
        )

        res.status(201).json({
            track
        })

    }   

}