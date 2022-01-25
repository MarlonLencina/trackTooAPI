import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";
import {hash} from "bcryptjs"
import { ItrackRepository } from "@modules/track/repositories/ITracksRepository";


@injectable()
export class DeleteTrackUseCase {

    constructor(
        @inject("TracksRepository")
        private TracksRepository: ItrackRepository
    ) {}

    public async execute(track_id: string){

        const track = await this.TracksRepository.deleteTrack(track_id)

        return track


    }

}
