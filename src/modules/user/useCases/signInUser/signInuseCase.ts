

import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";
import {sign} from "jsonwebtoken"
import { jwtconfig } from "@config/jwt.config";
import { compare, hash } from "bcryptjs";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: User;
}

@injectable()
export class SignInUserUseCase {

    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository
    ) {}

    public async execute(
        {
        email,
        password
    }: IRequest
    ): Promise<IResponse> {

        
        const user = await this.UsersRepository.findUserByMail(email)

        if(!user){
            throw new AppError('email/password is wrong', 401)
        }

        const comparePassword = await compare(password, user.password)

        if(!comparePassword){
            throw new AppError('email/password is wrong', 401)
        }

        const token = sign({
            email: user.email
        }, jwtconfig.secret, {
            subject: user.id,
            expiresIn: jwtconfig.expiresIn
        })

        return {
            user, token
        }

    }

}