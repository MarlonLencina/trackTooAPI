import { jwtconfig } from "@config/jwt.config";
import { IRefreshTokenRepository } from "@modules/user/repositories/IRefreshTokenRepository";
import { addHours, isBefore } from "date-fns";
import { sign } from "jsonwebtoken";
import { AppError } from "shared/Errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
export class RefreshTokenUseCase {

    constructor(
        @inject("RefreshTokenRepository")
        private RefreshTokenRepository: IRefreshTokenRepository
    ) {}

    public async execute(refreshTokenId: string){

        
        const refreshTokenIsValid = await this.RefreshTokenRepository.findRefreshToken(refreshTokenId)

        if(!refreshTokenIsValid){
            throw new AppError("Refresh Token is invalid", 401)
        }

        const isValid = isBefore(new Date(), new Date(refreshTokenIsValid.expires_in))

        if(!isValid){
            throw new AppError("Refresh Token is expired", 401)
        }

        await this.RefreshTokenRepository.deleteRefreshToken(refreshTokenIsValid.id)

        const expires_in = addHours(new Date(), 24)

        const refreshToken = await this.RefreshTokenRepository.generateRefreshToken(refreshTokenIsValid.user_id, expires_in)

        const token = sign({}, jwtconfig.secret, {
            expiresIn: jwtconfig.expiresIn,
            subject: refreshTokenIsValid.user_id
        })
        
        return {
            token,
            refreshToken
        }

    }

}