import { ITrackDTO } from "../DTO/ITrackDTO";
import { Track } from "../infra/typeorm/entities/track.entity";


export interface ItrackRepository {

    createTrack: ({
        code_track,
        title,
        user_id
    }: ITrackDTO) => Promise<Track>
    findTrackById: (track_id: string) => Promise<Track>
    findAllTracksByUser: (user_id: string) => Promise<Track[]>
    deleteTrack: (track_id: string) => Promise<void>
}