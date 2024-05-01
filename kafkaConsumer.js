const { Kafka } = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const consumeMessages = async (topic) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        partition,
        offset: message.offset
      });
    }
  });
};

module.exports = consumeMessages;
