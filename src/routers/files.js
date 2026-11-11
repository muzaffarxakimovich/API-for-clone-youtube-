import express from "express"
import fileController from "../controllers/files.js"
import checkToken from "../middleware/check-token.js"

const filesRouter = express.Router()

filesRouter.post("/api/v1/files",checkToken, fileController.createFile)
filesRouter.get("/api/v1/files/my",checkToken, fileController.getMyFiles)
filesRouter.delete("/api/v1/files",checkToken, fileController.deleteUserVideo)

export default filesRouter