import { IUserResponseDTO } from "@modules/user/DTO/IUserResponseDTO";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { UserMap } from "@modules/user/mapper/UserMap";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { AppError } from "shared/Errors/appError";
import { IStorageProvider } from "shared/infra/Providers/IStorage";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    file: Express.Multer.File;
}

@injectable()
export class UploadAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository,
        @inject("StorageProvider")
        private StorageProvider: IStorageProvider
    ) {}

    public async execute({
        file,
        user_id
    }: IRequest): Promise<IUserResponseDTO> 
    {        
        const user = await this.UsersRepository.findUserById(user_id)

        if(!user){
            throw new AppError("User is invalid.", 401)
        }

        if(user.avatar){
            await this.StorageProvider.delete('avatars', user.avatar)
        }

        user.avatar = file.filename

        await this.StorageProvider.save('avatars', file.filename, file.mimetype)

        await this.UsersRepository.createUser(user)

        const mappedUser = UserMap.toDTO(user)

        return mappedUser

    }

}