import express from "express"
import { createCompany, deleteCompany, getAllCompany, getProfileCompany, updateCompany } from "../controllers/companyCtrl"
import isLogin from "../middlewares/isLogin"
const routes = express.Router()
routes.route("/profile").get(isLogin, getProfileCompany)
routes.route("/").get(getAllCompany).post(createCompany)
routes.route("/:id").delete(deleteCompany).put(updateCompany).get(getProfileCompany)
export = routes