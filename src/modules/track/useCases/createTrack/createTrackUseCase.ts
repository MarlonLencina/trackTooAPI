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
export class CreateTrackUseCase {

    constructor(
        @inject("TracksRepository")
        private TracksRepository: ItrackRepository
    ) {}

    public async execute({
        code_track,
        title,
        user_id
    }: IRequest){
    
        const isValidCodeTrack = /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(code_track)

        if(!isValidCodeTrack) {
            throw new AppError('Code track is invalid.', 401)
        }

        const track = await this.TracksRepository.createTrack({
            code_track,
            title,
            user_id
        })

        return track


    }

}