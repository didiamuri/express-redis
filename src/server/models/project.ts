import mongoose from 'mongoose';
import { IProject } from '@src/interfaces';

const { Schema } = mongoose;

const schema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: 'draft' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
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

export default mongoose.model<IProject>('Project', schema);