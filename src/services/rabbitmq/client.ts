import { Channel ,connect,Connection} from "amqplib";

import rabbitmqConfig from "../../config/rabbitMq";

import Producer from "./producer";
import {EventEmitter} from 'events'

import Consumer from "./consumer";


class RabbitMqClient{
    private constructor(){}

    private static instance:RabbitMqClient
    private isInitialized = false;
    
    private producer:Producer |undefined;
    private consumer: Consumer | undefined;
    private connection:Connection |undefined;
    private produceChannel : Channel |undefined ;
    private consumerChannel: Channel |undefined;
    private eventEmitter :EventEmitter|undefined;


    public static getInstance(){
        if(!this.instance){
            this.instance=new RabbitMqClient()

        }
        return this.instance
    }

    async initialize(){
        if(this.isInitialized){
            return
        }
        try{
            this.connection=await connect(rabbitmqConfig.rabbitMQ.url);
            this.produceChannel=await this.connection.createChannel()
            this.consumerChannel=await this.connection.createChannel()

            const {queue:replyQueueName} = await this.consumerChannel.assertQueue("",{exclusive:true})
            this.eventEmitter=new EventEmitter()
            this.producer= new Producer(
                this.produceChannel,
                replyQueueName,
                this.eventEmitter
            )
            this.consumer= new Consumer(this.consumerChannel,replyQueueName,this.eventEmitter)
            this.consumer?.consumeMessage()
            this.isInitialized=true
        }catch(error){
            console.log("rabbitMq error ... ",error);
            
        }
    }

    async produce(data:any,operation:string){
        if(!this.isInitialized){
            await this.initialize()
        }
        return await this.producer?.produceMessage(data,operation);
    }
}

export default RabbitMqClient.getInstance()