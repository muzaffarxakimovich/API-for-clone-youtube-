import express from "express"
import userController from "../controllers/users.js"

const router = express.Router()

router
.post("/api/v1/register", userController.register)
.post("/api/v1/login", userController.login)

export default router