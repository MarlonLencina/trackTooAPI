import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";
import {hash} from "bcryptjs"
import { ItrackRepository } from "@modules/track/repositories/ITracksRepository";

interface IRequest {
    title: string;
    code_track: string;
    user_id: string;
}

@injectable()
export class GetTrackByIdUseCase {

    constructor(
        @inject("TracksRepository")
        private TracksRepository: ItrackRepository
    ) {}

    public async execute(track_id: string, user_id: string){

        const track = await this.TracksRepository.findTrackById(track_id)

        if(track.user_id !== user_id){
            throw new AppError('Cannot get track with diferent user', 401)
        }

        return track


    }

}