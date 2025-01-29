import express from "express"
import { deleteFile, uploadFile } from "../controllers/uploadCtrl"
import upload from "../middlewares/upload"
const routes = express.Router()
routes.route("/").post(upload, uploadFile).delete(deleteFile)
export = routes