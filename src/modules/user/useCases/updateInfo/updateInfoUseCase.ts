import { IUserResponseDTO } from "@modules/user/DTO/IUserResponseDTO";
import { UserMap } from "@modules/user/mapper/UserMap";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

@injectable()
export class UpdateInfoUseCase {

    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository,
    ) {}

    public async execute({
        user_id,
        email,
        last_name,
        name,
        password
    }: IRequest): Promise<IUserResponseDTO> 
    {        
        const user = await this.UsersRepository.findUserById(user_id)

        if(!user){
            throw new AppError("User is invalid.", 401)
        }

        const updatedUser = Object.assign(user, {
            email,
            last_name,
            name
        })

        if(password) updatedUser.password = await hash(password, 8)
        
        await this.UsersRepository.createUser(updatedUser)

        const mappedUser = UserMap.toDTO(user) 

        return mappedUser
    }

}