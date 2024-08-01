import bcrypt from 'bcryptjs';
import AppError from "@src/utils/app-error";
import { IUser } from "@src/interfaces";
import { UserModel } from "@src/server/models";

export default class UserService {
    static async create(params: IUser): Promise<any> {
        if (await UserModel.findOne({ email: params.email }).exec()) {
            throw new Error('User already exists');
        }
        try {
            params.password = bcrypt.hashSync(params.password, 10);
            return await UserModel.create(params);
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }

    static async authenticate(email: string, password: string): Promise<any> {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            throw new AppError('User not found', 404);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new AppError('Incorrect email address or password!', 406);
        }
        try {
            return user
        } catch (e) {
            throw new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500);
        }
    }
}