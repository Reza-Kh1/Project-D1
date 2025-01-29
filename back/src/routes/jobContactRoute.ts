import express from "express"
import { createJobContact, getJobContact, updateJobContact } from "../controllers/jobContactCtrl"
const routes = express.Router()
routes.route("/").post(createJobContact).get(getJobContact)
routes.route("/:id").put(updateJobContact)
export = routes