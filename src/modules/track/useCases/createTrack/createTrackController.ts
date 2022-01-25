import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTrackUseCase } from "./createTrackUseCase";


export class CreateTrackController {


    public async handle (req: Request, res: Response) {

        const {user_id} = req

        const {
            title,
            code_track,
        } = req.body


        const createTrackUseCase = container.resolve(CreateTrackUseCase)

        const track = await createTrackUseCase.execute({
            user_id,
            title,
            code_track
        })

        res.status(201).json({
            message: "track was succesfully created.",
            track
        })

    }   

}