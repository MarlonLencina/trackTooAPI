import { ICreateUserDTO } from "../DTO/ICreateUserDTO";
import {User} from "./../infra/typeorm/entities/users.entity"

export interface IUsersRepository {

    createUser: (data: ICreateUserDTO) => Promise<User>
    findUserById: (userId: string) => Promise<User>
    findUserByMail: (mail: string) => Promise<User>

}