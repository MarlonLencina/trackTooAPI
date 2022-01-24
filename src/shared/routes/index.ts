import { Router } from "express";

export const routes = Router()

routes.get("/", (req, res) => {
    res.json("is alive testing docker compose")
})