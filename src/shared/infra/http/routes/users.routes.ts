import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/createUser/createUserController";
import { UploadAvatarController } from "@modules/user/useCases/updateAvatar/updateAvatarController";

import multer from "multer"
import { storage } from "@config/multer.config";
import { ensureAuthenticated } from "../MIddlewares/ensureAuthenticated";

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const uploadAvatarController = new UploadAvatarController()

const upload = multer({
    storage
})

usersRoutes.post('/', createUserController.handle)

usersRoutes.put('/avatar', ensureAuthenticated, upload.single("avatar"), uploadAvatarController.handle)

