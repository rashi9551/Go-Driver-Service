import { Application } from "express";
import connectDB from "./config/mongo";
import RabbitMQClient from "./rabbitMq/client";
import express from "express";
import http from 'http'

const PORT=process.env.PORT
class App{
    public app: Application;
    public server;
    constructor() {
      this.app=express()
      this.server=http.createServer(this.app)
      this.server.listen(process.env.DRIVER_PORT,()=>{
        console.log(`server  http://localhost:${process.env.DRIVER_PORT}`);
        
      })
        RabbitMQClient.initialize();
        connectDB()        
    }
  
    
}

export default App