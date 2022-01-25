import { IResetTokenDTO } from "../DTO/IResetTokenDTO";
import { ResetToken } from "../infra/typeorm/entities/resetToken.entity";

export interface IResetTokenRepository {

    createToken: ({token, expires_date, user_id}: IResetTokenDTO) => Promise<ResetToken>;
    findToken: (token: string) => Promise<ResetToken>;
    deleteToken: (token: string) => Promise<void>
}