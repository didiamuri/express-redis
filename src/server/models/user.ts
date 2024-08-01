import mongoose from 'mongoose';
import { IUser } from '@src/interfaces';

const { Schema } = mongoose;

const schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true,
});

schema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (doc, returned) => {
        delete returned.password;
    }
});

export default mongoose.model<IUser>('User', schema, 'users');