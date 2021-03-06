import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";
import { IResetTokenRepository } from "@modules/user/repositories/IResetTokenRepository";
import {v4 as uuidv4} from "uuid"
import {addHours} from 'date-fns'
import { ResetToken } from "@modules/user/infra/typeorm/entities/resetToken.entity";
import { IEmailProvider } from "shared/infra/Providers/IEmailProvider";

interface IResponse {
    token: ResetToken;
}

@injectable()
export class SendForgotPasswordUseCase {

    constructor(
        @inject("ResetTokenRepository")
        private ResetTokenRepository: IResetTokenRepository,
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository,
        @inject("MailgunProvider")
        private MailgunProvider: IEmailProvider,
    ) {}

    public async execute(email: string): Promise<IResponse> {


        const user = await this.UsersRepository.findUserByMail(email)

        if(!user){
            throw new AppError("user does not exist", 401)
        }

        const token = uuidv4();
        const expires_date = addHours(new Date(), 3);


        const newToken = await this.ResetTokenRepository.createToken({
            token,
            expires_date,
            user_id: user.id
        })

        await this.MailgunProvider.sendEmail({
            email: user.email,
            link: `http://localhost:3000/reset/${newToken.token}}`,
            name: user.name
        })

        return {
            token: newToken
        }
    }
}