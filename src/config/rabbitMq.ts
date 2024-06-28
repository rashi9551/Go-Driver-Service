import 'dotenv/config'

export default {
    rabbitMQ: {
      url: String(process.env.RabbitMqUrl),
    },
    queues: {
        driverQueue: "drivers_queue",
      }
  };

 