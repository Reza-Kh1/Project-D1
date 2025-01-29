import express from "express"
import { deleteUser, getAllUser, getProfile, updateUser } from "../controllers/userCtrl"
import isLogin from "../middlewares/isLogin"
const routes = express.Router()
routes.route("/").get(getAllUser)
routes.route("/:id").delete(deleteUser).put(isLogin, updateUser)
routes.route("/profile").get(isLogin, getProfile)
export = routes