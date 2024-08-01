import mongoose from "mongoose";

const connection = async () => {
    await mongoose.connect(process.env['MONGODB_URI'] as string);
    mongoose.Promise = global.Promise;
}

export default connection;