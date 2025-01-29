import express from "express"
import { createChat, deleteChat, getChat } from "../controllers/chatCtrl"
const routes = express.Router()
routes.route("/").post(createChat).get(getChat)
routes.route("/:id").delete(deleteChat)
export = routes