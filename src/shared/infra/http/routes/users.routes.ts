import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/createUser/createUserController";
import { UploadAvatarController } from "@modules/user/useCases/updateAvatar/updateAvatarController";

import multer from "multer"
import { storage } from "@config/multer.config";
import { ensureAuthenticated } from "../MIddlewares/ensureAuthenticated";
import { UpdateInfoController } from "@modules/user/useCases/updateInfo/updateInfoController";

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const uploadAvatarController = new UploadAvatarController()
const updateInfoController = new UpdateInfoController()

const upload = multer({
    storage
})

usersRoutes.post('/', createUserController.handle)

usersRoutes.put('/avatar', ensureAuthenticated, upload.single("avatar"), uploadAvatarController.handle)

usersRoutes.put('/', ensureAuthenticated, updateInfoController.handle)
