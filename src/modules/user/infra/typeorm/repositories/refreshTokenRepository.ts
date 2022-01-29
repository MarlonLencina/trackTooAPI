import { IResetTokenDTO } from "@modules/user/DTO/IResetTokenDTO";
import { IRefreshTokenRepository } from "@modules/user/repositories/IRefreshTokenRepository";
import { IResetTokenRepository } from "@modules/user/repositories/IResetTokenRepository";
import { getRepository, Repository } from "typeorm";
import { RefreshToken } from "../entities/refreshToken.entity";


export class RefreshTokenRepository implements IRefreshTokenRepository {
    private repository: Repository<RefreshToken>

    constructor() {
        this.repository = getRepository(RefreshToken)
    }


    public async generateRefreshToken(user_id: string, expires_in: Date): Promise<RefreshToken> {

        const newRefreshToken = this.repository.create({
            user_id,
            expires_in
        })

        await this.repository.save(newRefreshToken)
        return newRefreshToken
    }
    
    public async deleteRefreshToken(refreshToken: string): Promise<void> {

        await this.repository.delete({
            id: refreshToken
        })

    }

    public async findRefreshToken(refreshTokenId: string): Promise<RefreshToken> {

        const refreshToken = await this.repository.findOne({
            id: refreshTokenId
        })

        return refreshToken

    }

}