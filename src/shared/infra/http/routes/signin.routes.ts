import { SignInUserController } from "@modules/user/useCases/signInUser/signInUserController";
import { Router } from "express";

export const signInRoutes = Router()

const signInUserController = new SignInUserController()

signInRoutes.post('/', signInUserController.handle)