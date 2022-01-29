import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("refreshToken")
export class RefreshToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    expires_in: Date;

}