import { RefreshToken } from "../infra/typeorm/entities/refreshToken.entity";

export interface IRefreshTokenRepository {
    generateRefreshToken: (user_id: string, expires_in: Date) => Promise<RefreshToken>
    deleteRefreshToken: (refreshToken: string) => Promise<void>
    findRefreshToken: (refreshTokenId: string) => Promise<RefreshToken>
}