import AppError from '@src/utils/app-error';
import { NextFunction, Request, Response } from 'express';

export default function badUrl(req: Request, res: Response, next: NextFunction) {
    next(new AppError(`Requested url ${req.path} not found`, 404));
}