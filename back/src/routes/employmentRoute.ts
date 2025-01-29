import express from "express"
import { createEmployment, deleteEmployment, getEmployment, updateEmployment } from "../controllers/employmentCtrl"
const routes = express.Router()
routes.route("/").post(createEmployment).get(getEmployment)
routes.route("/:id").delete(deleteEmployment).put(updateEmployment)
export = routes