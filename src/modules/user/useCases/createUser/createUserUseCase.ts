import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";
import {hash} from "bcryptjs"
import { UserMap } from "@modules/user/mapper/UserMap";
import {IUserResponseDTO} from '../../DTO/IUserResponseDTO'

interface IRequest {
    email: string;
    name: string;
    last_name: string;
    password: string;
}

@injectable()
export class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository
    ) {}

    public async execute({
        email,
        last_name,
        name,
        password
    }: IRequest): Promise<IUserResponseDTO>{

        if(!email || !last_name || !name || !password){
            throw new AppError("Missing credentials to create a new account", 401)
        }

        const emailIsInUse = await this.UsersRepository.findUserByMail(email)

        if(emailIsInUse) {
            throw new AppError("Email is already in yse", 401)
        }
        
        const hashedPassword = await hash(password, 8)

        const user = await this.UsersRepository.createUser({email, last_name, name, password: hashedPassword})

        const mappedUser = UserMap.toDTO(user)

        return mappedUser


    }

}