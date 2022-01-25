import { ICreateUserDTO } from "modules/user/DTO/ICreateUserDTO";
import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/users.entity";


export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }


    public async createUser({email, name, last_name, password, id, avatar}: ICreateUserDTO): Promise<User> {

        const user = this.repository.create({
            id, avatar, email, name, last_name, password
        })

        await this.repository.save(user)
        return user

    }

    public async findUserById (userId: string): Promise<User> {

        const user = await this.repository.findOne({
            where: {
                id: userId
            }
        })

        return user

    }

    public async findUserByMail(mail: string): Promise<User> {

        const user = await this.repository.findOne({
            where: {
                email: mail
            }
        })

        return user

    }

}
