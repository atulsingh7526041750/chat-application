const { Kafka } = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers
});

const producer = kafka.producer();

const produceMessage = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      { value: message }
    ]
  });
  await producer.disconnect();
};

module.exports = produceMessage;
