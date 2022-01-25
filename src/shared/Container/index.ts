import { ResetTokenRepository } from "@modules/user/infra/typeorm/repositories/resetTokenRepository"
import { IResetTokenRepository } from "@modules/user/repositories/IResetTokenRepository"
import { UsersRepository } from "modules/user/infra/typeorm/repositories/usersRepository"
import { IUsersRepository } from "modules/user/repositories/IUsersRepository"
import {
    container
} from "tsyringe"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IResetTokenRepository>(
    "ResetTokenRepository",
    ResetTokenRepository
)