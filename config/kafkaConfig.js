// config.js

module.exports = {
    kafka: {
      clientId: 'my-app',
      brokers: ['localhost:9092'],
      connectionTimeout: 3000,
      authenticationTimeout: 1000,
      reauthenticationThreshold: 10000,
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: 'Atul',
        password: 'Atulsingh@12'
      }
    }
  };
  