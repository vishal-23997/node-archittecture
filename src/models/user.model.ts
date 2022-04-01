import md5 from "md5";
import { Schema, model } from "mongoose";

export interface User {
    email: string;
    password: string;
    fname: string;
    lname: string;
    mobileNumber: number;
    city: string;
    isActive: boolean;
}

const schema = new Schema<User>({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String },
    mobileNumber: { type: Number, required: true },
    city: { type: String, required: true },
    isActive: { type : Boolean ,default: true }

}, { timestamps: true });

const UserModel = model<User>('User', schema);

export default UserModel;

