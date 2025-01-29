import express from "express"
import { creatScore, getScore } from "../controllers/scoreCtrl"
const routes = express.Router()
routes.route("/").post(creatScore).get(getScore)
export = routes