import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/createUser/createUserController";

import multer from "multer"

export const usersRoutes = Router()

const createUserController = new CreateUserController()

const upload = multer({
    dest: "uploads/"
})

usersRoutes.post('/', createUserController.handle)

// usersRoutes.put('/avatar', upload.single("avatar"), )

