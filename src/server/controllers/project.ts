import AppError from "@src/utils/app-error";
import ProjectService from "../services/project";
import { NextFunction, Request, Response } from "express";

export default class ProjectController {
    static async create(req: Request, res: Response, next: NextFunction) {
        if (!req.body.name || !req.body.description) {
            return next(new Error('Missing required fields'));
        }
        ProjectService.create(req.body, req.session.sub)
            .then(_ => {
                res.status(201).json({
                    status: 'success',
                    statusCode: 201,
                    message: 'Project created successfully'
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async findAll(req: Request, res: Response, next: NextFunction) {
        ProjectService.findAll(req.session.sub)
            .then(projects => {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    items: projects,
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async findById(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next(new Error('Missing required fields'));
        }
        ProjectService.findById(req.params.id)
            .then(project => {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    item: project,
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        if (!req.body || !req.params.id) {
            return next(new Error('Missing required fields'));
        }
        ProjectService.update(req.params.id, req.body)
            .then(project => {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'Project updated successfully',
                    item: project,
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next(new Error('Missing required fields'));
        }
        ProjectService.delete(req.params.id)
            .then(_ => {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'Project deleted successfully'
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async inProgress(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next(new Error('Missing required fields'));
        }
        ProjectService.inProgress(req.params.id)
            .then(_ => {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'Project updated successfully'
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }

    static async done(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next(new Error('Missing required fields'));
        }
        ProjectService.done(req.params.id)
            .then(_ => {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'Project updated successfully'
                });
            })
            .catch(e => next(new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500)));
    }
}