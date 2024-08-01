import AppError from "@src/utils/app-error";
import { Types } from "mongoose";
import { IProject } from "@src/interfaces";
import { ProjectModel } from "@src/server/models";

export default class ProjectService {
    static async create(params: IProject, userId: string): Promise<any> {
        if (await ProjectModel.findOne({ name: params.name, createdBy: userId }).exec()) {
            throw new AppError('Project already exists', 409);
        }
        try {
            params.createdBy = new Types.ObjectId(userId);
            return await ProjectModel.create(params);
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async findAll(userId: string): Promise<any> {
        try {
            return await ProjectModel.find({ createdBy: userId }).exec();
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async update(id: string, params: IProject): Promise<any> {
        const project = await ProjectModel.findOne({ _id: id }).exec();
        if (!project) {
            throw new AppError('Project not found', 404);
        }
        try {
            return await ProjectModel.findOneAndUpdate({ _id: id }, params, { new: true });
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async delete(id: string): Promise<any> {
        const project = await ProjectModel.findOne({ _id: id }).exec();
        if (!project) {
            throw new AppError('Project not found', 404);
        }
        try {
            return await ProjectModel.findOneAndDelete({ _id: id });
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async findById(id: string): Promise<any> {
        const project = await ProjectModel.findOne({ _id: id }).exec();
        if (!project) {
            throw new AppError('Project not found', 404);
        }
        try {
            return project;
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async inProgress(id: string): Promise<any> {
        const project = await ProjectModel.findOne({ _id: id }).exec();
        if (!project) {
            throw new AppError('Project not found', 404);
        }
        try {
            project.status = 'in-progress';
            return await ProjectModel.findOneAndUpdate({ _id: id }, { status: 'in-progress' }).exec();
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async done(id: string): Promise<any> {
        const project = await ProjectModel.findOne({ _id: id }).exec();
        if (!project) {
            throw new AppError('Project not found', 404);
        }
        try {
            project.status = 'done';
            return await ProjectModel.findOneAndUpdate({ _id: id }, { status: 'done' }).exec();
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }
}