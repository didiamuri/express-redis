import AppError from "@src/utils/app-error";
import { NextFunction, Request, Response } from "express";

export default function isAuthenticated(req: Request, _: Response, next: NextFunction) {
    if (!req.session.sub) {
        next(new AppError(
            'Your session has expired or you do not have authorization to access this resource',
            401
        ));
    }
    next();
}