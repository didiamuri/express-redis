import AppError from "@src/utils/app-error";
import UserService from "@src/server/services/user";
import { NextFunction, Request, Response } from "express";

export default class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        if (!req.body.email || !req.body.password || !req.body.name) {
            return next(new AppError('Missing required fields', 406));
        }
        UserService.create(req.body)
            .then(user => {
                res.status(201).json({
                    status: 'success',
                    statusCode: 201,
                    message: 'Account created successfully',
                    item: user,
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async authenticate(req: Request, res: Response, next: NextFunction) {
        if (!req.body.email || !req.body.password) {
            return next(new AppError('Missing required fields', 406));
        }
        UserService.authenticate(req.body.email, req.body.password)
            .then(user => {
                req.session.regenerate((err) => {
                    if (err) {
                        return next(new AppError(err.message ? err.message : err, err.statusCode ? err.statusCode : 500));
                    }
                    req.session.sub = user._id.toString();
                    res.status(200).json({
                        status: 'success',
                        statusCode: 200,
                        message: 'Successfully authenticated',
                        item: user,
                    });
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }
}