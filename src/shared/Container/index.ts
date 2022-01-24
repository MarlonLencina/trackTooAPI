import { UsersRepository } from "modules/user/infra/typeorm/repositories/usersRepository"
import { IUsersRepository } from "modules/user/repositories/IUsersRepository"
import {
    container
} from "tsyringe"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)