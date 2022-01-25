import { Router } from "express";

import { ResetPasswordController } from "@modules/user/useCases/ResetPassword/ResetPasswordController";
import { SendForgotPasswordController } from "@modules/user/useCases/sendForgetPassword/sendForgetPasswordController";

const resetPasswordController = new ResetPasswordController()
const sendForgotPasswordController = new SendForgotPasswordController()

export const passwordRoutes = Router()

passwordRoutes.post("/forgot", sendForgotPasswordController.handle)
passwordRoutes.post("/reset/:token", resetPasswordController.handle)

