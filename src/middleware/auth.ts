import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import { ObjectId } from 'mongoose'

export default {
    createToken:async(clientId:ObjectId)=>{
        const jwtSeceretKey="Rashid";
        const token=jwt.sign({clientId},jwtSeceretKey)
        return token

    }
}
