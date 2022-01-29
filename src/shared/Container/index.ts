import { TracksRepository } from "@modules/track/infra/typeorm/repositories/tracksRepository"
import { ItrackRepository } from "@modules/track/repositories/ITracksRepository"
import { RefreshTokenRepository } from "@modules/user/infra/typeorm/repositories/refreshTokenRepository"
import { ResetTokenRepository } from "@modules/user/infra/typeorm/repositories/resetTokenRepository"
import { IRefreshTokenRepository } from "@modules/user/repositories/IRefreshTokenRepository"
import { IResetTokenRepository } from "@modules/user/repositories/IResetTokenRepository"
import { UsersRepository } from "modules/user/infra/typeorm/repositories/usersRepository"
import { IUsersRepository } from "modules/user/repositories/IUsersRepository"
import { IEmailProvider } from "shared/infra/Providers/IEmailProvider"

import {
    container
} from "tsyringe"

import "../infra/Providers"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IResetTokenRepository>(
    "ResetTokenRepository",
    ResetTokenRepository
)

container.registerSingleton<ItrackRepository>(
    "TracksRepository",
    TracksRepository
)

container.registerSingleton<IRefreshTokenRepository>(
    "RefreshTokenRepository",
    RefreshTokenRepository
)