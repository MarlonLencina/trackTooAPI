import { inject, injectable } from "tsyringe";
import { ItrackRepository } from "@modules/track/repositories/ITracksRepository";

@injectable()
export class GetTracksByUserUseCase {

    constructor(
        @inject("TracksRepository")
        private TracksRepository: ItrackRepository
    ) {}

    public async execute(user_id: string){

        const tracks = await this.TracksRepository.findAllTracksByUser(user_id)

        return tracks


    }

}