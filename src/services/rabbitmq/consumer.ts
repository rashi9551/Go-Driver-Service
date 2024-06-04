import { Channel, ConsumeMessage } from "amqplib";
import EventEmitter from "events";

export default class Consumer {
  constructor(
    private channel: Channel,
    private relpyQueueName: string,
    private eventEmitter: EventEmitter
  ) {}

  async consumeMessage() {
    console.log("Ready for consuming");

    this.channel.consume(
      this.relpyQueueName,
      (message: ConsumeMessage | null) => {
        if (message) {
          this.eventEmitter.emit(
            message.properties.correlationId.toString(),
            message
          );
        }
      },
      {
        noAck:true,
      }
    );
  }
}
