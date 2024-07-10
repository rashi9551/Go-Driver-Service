import 'dotenv/config'

console.log(process.env.RabbitMqUrl);

export default {
    rabbitMQ: {
      url: String(process.env.RabbitMqUrl),
    },
    queues: {
        driverQueue: "drivers_queue",
      }
  };

 