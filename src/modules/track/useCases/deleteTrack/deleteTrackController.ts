import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTrackUseCase } from "./deleteTrackUseCase";


export class DeleteTrackController {


    public async handle (req: Request, res: Response) {

        const {track_id} = req.params

        const deleteTrackUseCase = container.resolve(DeleteTrackUseCase)

        await deleteTrackUseCase.execute(
            track_id
        )

        res.status(200).json({
            message: "track was deleted succesfully."
        })

    }   

}
