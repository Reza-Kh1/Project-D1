import express from "express"
import http from "http"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import path from "path"
import cookieParser from "cookie-parser"
import userRoute from "../routes/userRoute"
import companyRoute from "../routes/companyRoute"
import authRoute from "../routes/authRoute"
import employmentRoute from "../routes/employmentRoute"
import jobContactRoute from "../routes/jobContactRoute"
import chatRoute from "../routes/chatRoute"
import messageRoute from "../routes/messageRoute"
import scoreRoute from "../routes/scoreRoute"
import uploadRoute from "../routes/uploadRoute"
import { globalHandler, notFound } from "../middlewares/globalError"
///////////// config Security
dotenv.config();
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true,
    })
);
app.use(helmet.xssFilter());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
const defualtApi = process.env.API_VERSION

///////////// Api Routes
app.use(defualtApi + "expert", userRoute);
app.use(defualtApi + "company", companyRoute);
app.use(defualtApi + "auth", authRoute);
app.use(defualtApi + "employment", employmentRoute);
app.use(defualtApi + "jobContact", jobContactRoute);
app.use(defualtApi + "chat", chatRoute);
app.use(defualtApi + "message", messageRoute);
app.use(defualtApi + "score", scoreRoute);
app.use(defualtApi + "upload", uploadRoute);
app.use(globalHandler);
app.use(notFound);

///////////// Config Server
const server = http.createServer(app);
const hostName: string | undefined = process.env.HOST_NAME
const port = Number(process.env.PORT_SERVER)
server.listen(port, hostName, () => {
    console.log(`server run in port ${port}`);
});