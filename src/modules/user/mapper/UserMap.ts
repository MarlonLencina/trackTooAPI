import { instanceToInstance } from "class-transformer";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { IUserResponseDTO } from "../DTO/IUserResponseDTO";

export class UserMap {
  static toDTO({
    avatar,
    email,
    id,
    last_name,
    name,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      last_name,
      avatar_url
    });
    return user;
  }
}