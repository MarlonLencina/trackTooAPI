import {Request, Response} from "express"
import { container } from "tsyringe"
import { RefreshTokenUseCase } from "./refreshTokenUseCase"

export class RefreshTokenController {

    public async handle(req: Request, res: Response){
        
        const {
            refreshToken
        } = req.body

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

        const {token, refreshToken: newRefreshToken} = await refreshTokenUseCase.execute(
            refreshToken
        )

        res.status(201).json({
            token,
            refreshToken: newRefreshToken.id
        })


    }

}