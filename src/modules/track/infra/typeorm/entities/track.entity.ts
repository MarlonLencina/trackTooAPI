import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tracks")
export class Track {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    code_track: string;

    @CreateDateColumn()
    created_at: string;

    @Column()
    user_id: string;

}