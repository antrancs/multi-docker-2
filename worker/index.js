const keys = require('./keys');

const redis = require('redis');

const redisClient = redis.createClient({
  port: keys.redisPort,
  host: keys.redisHost,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(value) {
  if (value < 2) {
    return 1;
  }

  return fib(value - 1) + fib(value - 2);
}

sub.on('message', (channel, message) => {
  console.log('Receive message');
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');
