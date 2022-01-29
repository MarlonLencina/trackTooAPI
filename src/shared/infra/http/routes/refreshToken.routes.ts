import { RefreshTokenController } from "@modules/user/useCases/updateRefreshToken/refreshTokenController";
import { Router } from "express";

export const refreshTokenRoutes = Router()

const refreshTokenController = new RefreshTokenController()

refreshTokenRoutes.post('/', refreshTokenController.handle)