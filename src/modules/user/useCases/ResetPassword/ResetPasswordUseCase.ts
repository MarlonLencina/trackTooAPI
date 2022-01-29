import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";
import { IResetTokenRepository } from "@modules/user/repositories/IResetTokenRepository";
import {isBefore} from 'date-fns'
import { hash } from "bcryptjs";


@injectable()
export class ResetPasswordUseCase {

    constructor(
        @inject("ResetTokenRepository")
        private ResetTokenRepository: IResetTokenRepository,
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository
    ) {}

    public async execute(token: string, newPassword: string): Promise<void> {

        const tokenExist = await this.ResetTokenRepository.findToken(token) 

        if(!tokenExist) {
            throw new AppError("Token does not is valid/ or expired.", 401)
        }

        const tokenExpiresDate = new Date(tokenExist.expires_date)
        const dateNow = new Date()
        const isBeforeTokenExpires = isBefore(tokenExpiresDate, dateNow)

        if(isBeforeTokenExpires){
            throw new AppError("Token does not is valid/ or expired.", 401)
        }

        const user = await this.UsersRepository.findUserById(tokenExist.user_id)

        if(!user){
            throw new AppError("something is wrong with user linked to this token.", 401)
        }

        const hashedNewPassword = await hash(newPassword, 8)

        user.password = hashedNewPassword


        await this.UsersRepository.createUser(user)

        await this.ResetTokenRepository.deleteToken(token)
    }
}