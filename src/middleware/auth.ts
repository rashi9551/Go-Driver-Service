import jwt, { JwtPayload } from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import { ObjectId } from 'mongoose'

export default {
    createToken:async(clientId:ObjectId)=>{
        const jwtSeceretKey="Rashid";
        const token=jwt.sign({clientId},jwtSeceretKey)
        return token

    },
    verifyToken:async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token = req.headers.authorization?.trim().split(" ")[1];
               console.log(token);
                
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
        } else {
            try {
                const jwtSecretKey = "Rashid";
                const decodedToken = jwt.verify(token, jwtSecretKey) as JwtPayload;
                // req.clientId = decodedToken.clientId;
                next();
            } catch (error) {
                res.status(500).json({ message: (error as Error).message });
            }
        }
        } catch (error) {
            console.log(error);
            
        }
    }
}
