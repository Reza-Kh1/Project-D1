import express from "express"
import { createMessage, deleteMessage, updateMessage } from "../controllers/messageCtrl"
const routes = express.Router()
routes.route("/").post(createMessage)
routes.route("/:id").delete(deleteMessage).put(updateMessage)
export = routes