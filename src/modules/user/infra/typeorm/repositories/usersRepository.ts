import { ICreateUserDTO } from "modules/user/DTO/ICreateUserDTO";
import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/users.entity";


export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }


    public async createUser({email, name, last_name, password}: ICreateUserDTO): Promise<User> {

        const user = await this.repository.create({
            email, name, last_name, password
        })

        await this.repository.save(user)
        return user

    }

}