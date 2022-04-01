import UserModel from "../models/user.model";
import { User } from "../models/user.model";
import {HydratedDocument} from 'mongoose';
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import md5 from "md5";

class UserController {

    signup = async (req: Request, res: Response): Promise<void> => {

        interface user {
            email: string,
            password: string,
            fname: string,
            lname: string,
            mobileNumber: string,
            city: string,
        }
        const use: user = req.body;

        const user = new UserModel({
            email: use.email,
            password: md5(use.password),
            fname: use.fname,
            lname: use.lname,
            mobileNumber: use.mobileNumber,
            city: use.city,
        });
        await user.save(async (err,data) => {
            if (err) res.status(409).send({ status: "User already exist" }); // 409 error for conflict if user already registered
            else {
                const nodeEnv: jwt.Secret = (process.env.TOKEN_KEY as Secret);
                const token:string = jwt.sign(use.email, nodeEnv);
                let userData : HydratedDocument<User> | null = await UserModel.findById(data._id);             
                res.status(200).send({ token: token, Status: "Signed-up successfully", userData : userData });
            }

        });
    }

    login = async (req: Request, res: Response): Promise<void> => {

        interface user {
            email: string,
            password: string
        }
        const use: user = req.body;

        let data: HydratedDocument<User> | null = await UserModel.findOne({ email: use.email }).select({ email: 1, password: 2, isActive: 7 });
        if (data != null) {
            if (md5(use.password) === data.password) {
                if (data.isActive === false) {
                    res.status(404).send({ Status: "User is in-active please re-activate your account!" });
                }
                else {
                    const nodeEnv: jwt.Secret = (process.env.TOKEN_KEY as Secret);
                    const token:string|JwtPayload = jwt.sign(use.email, nodeEnv);
                    res.status(200).send({ Status: "Logged-in successfully", token: token });
                }

            } else {
                res.status(400).send({ status: "Incorrect Password" });
            }
        }
        else {
            res.status(400).send({ Status: "User not found!" })
        }

    }

    getProfile = async (req: Request, res: Response): Promise<void> => {

        let userData: HydratedDocument<User> | null = await UserModel.findOne({ email: req.body.email })
            .select({ email: 1, fname: 3, lname: 4, mobileNumber: 5, city: 6 });
        //console.log(userData);
        res.status(200).send({ user_data: userData });

    }

    verifyToken = async (req: Request, res: Response) => {
        let userData: HydratedDocument<User> | null = await UserModel.findOne({ email: req.body.email }).select({ email: 1 });
        // console.log(userData)
        res.status(200).send({ user: userData?.email });
    }

    updateProfile = async (req: Request, res: Response) => {

        interface user {
            newMobileNumber?: string,
            newCity ?: string
        }
        const User: user = req.body;
        
        const newMobileNumber: string| undefined = User.newMobileNumber;
        const newCity: string| undefined = User.newCity;
        await UserModel.findOneAndUpdate({ email: req.body.email }, {mobileNumber: newMobileNumber, city: newCity });
        res.status(200).send({ Status: "Updated Succesfully" });
    }

    deactivate = async (req: Request, res: Response) => {

        await UserModel.findOneAndUpdate({ email: req.body.email }, { isActive: false });
        res.status(200).send({ Status: "Profile de-activated successfully" });
    }

    reactivate = async (req: Request, res: Response) => {
        await UserModel.findOneAndUpdate({ email: req.body.email }, { isActive: true });
        res.status(200).send({ Status: "User Re-activated" });
    }
}

export default UserController;