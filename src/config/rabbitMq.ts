import 'dotenv/config'

export default {
    rabbitMQ: {
      url: String(process.env.RabbitMqUrl),
    },
    queues: {
        driverQueue: "driver_queue",
        rideQueue:"ride_queue"
      }
  };

 