import { NextFunction, Request, Response } from "express"
import token from "jsonwebtoken"
import { customError } from "./globalError";
const isLogin = (req: Request, res: any, next: NextFunction) => {
    const cookie = req.cookies?.sitetest;
    try {
        token.verify(cookie, process.env.TOKEN_SECURITY as string);
        next();
    } catch (err) {
        throw customError("وارد حساب کاربری خود شوید.", 403)
    }
}
export default isLogin