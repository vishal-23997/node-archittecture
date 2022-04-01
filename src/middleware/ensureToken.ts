import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

function ensureToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader:string | undefined = req.headers["authorization"];
    if (typeof bearerHeader != undefined) {
        const bearer:string[] | undefined = bearerHeader?.split(" ");
        const bearerToken: string | undefined = bearer?.[1];
        req.headers["authorization"] = bearerToken;
        jwt.verify(`${req.headers["authorization"]}`, `${process.env.TOKEN_KEY}`, async (err, data) => {
            if (err) res.status(403).send({Status : "Unauthorized USER"});
            else{               
                req.body.email = data;                
                next();
            }
        })
    }
}

export default ensureToken;