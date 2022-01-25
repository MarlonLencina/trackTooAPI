import { Router } from "express";
import { passwordRoutes } from "./password.routes";
import { signInRoutes } from "./signin.routes";
import { trackRoutes } from "./track.routes";

import { usersRoutes } from "./users.routes";

export const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/signin", signInRoutes)
routes.use("/password", passwordRoutes)
routes.use("/track", trackRoutes)



