import { ITrackDTO } from "@modules/track/DTO/ITrackDTO";
import { ItrackRepository } from "@modules/track/repositories/ITracksRepository";
import { getRepository, Repository } from "typeorm";
import { Track } from "../entities/track.entity";


export class TracksRepository implements ItrackRepository {
    private repository: Repository<Track>

    constructor(){
        this.repository = getRepository(Track)
    }

    public async createTrack ({ code_track, title, user_id }: ITrackDTO): Promise<Track> {

        const track = this.repository.create({
            code_track,
            title,
            user_id
        })

        await this.repository.save(track)

        return track

    }

    public async findAllTracksByUser (user_id: string): Promise<Track[]> {

        const tracks = await this.repository.find({
            where: {
                user_id
            }
        })

        return tracks

    }

    public async findTrackById (track_id: string): Promise<Track> {

        const track = await this.repository.findOne({
            where: {
                id: track_id
            }
        })

        return track
    }

    public async deleteTrack(track_id: string): Promise<void> {

        await this.repository.delete({id: track_id}) 

    }

}