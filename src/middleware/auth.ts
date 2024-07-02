import jwt, { JwtPayload } from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import { ObjectId } from 'mongoose'

export default {
    createToken:async(clientId:ObjectId, expire: string)=>{
        const jwtSecretKey=process.env.JWT_SECRET||"Rashid";
        const token=jwt.sign({clientId}, jwtSecretKey, { expiresIn: expire })
        return token

    }  
}
