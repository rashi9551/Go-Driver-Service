import express,{Request,Response} from 'express'
import cors from "cors"
import {v4 as uuidv4} from 'uuid'
import session from 'express-session'
import http from 'http'

import connectDB from './config/mongo'
import driverRoute from './interfaces/routes/driverRoute'

const app=express()
const server=http.createServer(app)
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors());

app.use(
    session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
connectDB()

app.use('/driver',driverRoute)

app.get('/',(req:Request,res:Response)=>{
    res.send().status(200)
})
const port=process.env.PORT||3002
server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});