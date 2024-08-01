import { Types } from "mongoose";

export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProject {
    _id: string;
    name: string;
    description: string;
    status: string;
    createdBy: Types.ObjectId;
    createdAt: string;
    updatedAt: string;
}