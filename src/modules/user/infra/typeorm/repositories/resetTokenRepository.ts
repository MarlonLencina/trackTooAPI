import { IResetTokenDTO } from "@modules/user/DTO/IResetTokenDTO";
import { IResetTokenRepository } from "@modules/user/repositories/IResetTokenRepository";
import { getRepository, Repository } from "typeorm";
import { ResetToken } from "../entities/resetToken.entity";


export class ResetTokenRepository implements IResetTokenRepository {
    private repository: Repository<ResetToken>

    constructor() {
        this.repository = getRepository(ResetToken)
    }


    public async findToken (token: string): Promise<ResetToken> {

        const foundToken = await this.repository.findOne({
            where: {
                token
            }
        })

        return foundToken

    }

    public async createToken ({ token, expires_date, user_id }: IResetTokenDTO): Promise<ResetToken> {


        const newToken = await this.repository.create({
            token, expires_date, user_id
        })

        await this.repository.save(newToken)
        return newToken


    }

    public async deleteToken (token: string){

        // const tokenOnDatabase = await this.findToken(token)
        await this.repository.delete({ token })

    }
    

}