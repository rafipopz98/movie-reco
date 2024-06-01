import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect().then(() => {
  console.log('Redis client connected');
}).catch((err) => {
  console.error('Redis client connection error', err);
});

export default client;
