import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";

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
    }: IRequest){

        if(!email || !last_name || !name || !password){
            throw new AppError("Missing credentials to create a new account", 401)
        }
        
        const user = await this.UsersRepository.createUser({email, last_name, name, password})

        return user


    }

}