import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("resetToken")
export class ResetToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column()
    user_id: string;

    @Column()
    expires_date: Date;

}