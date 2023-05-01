import amqp, { Connection, Channel } from 'amqplib';

async function connect(): Promise<Channel> {
  const connection: Connection = await amqp.connect('amqp://localhost');
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue('test');
  return channel;
}

async function sendToQueue(channel: Channel, message: string): Promise<void> {
  channel.sendToQueue('test', Buffer.from(message));
}

async function close(channel: Channel, connection: Connection): Promise<void> {
  await channel.close();
  await connection.close();
}

export { connect, sendToQueue, close };
