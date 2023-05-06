import amqp, { Connection, Channel } from 'amqplib';

async function connect(): Promise<Channel> {
  const connection: Connection = await amqp.connect(process.env.AMQP_HOST!);
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue(process.env.AMQP_CHANNEL!);
  return channel;
}

async function sendToQueue(channel: Channel, message: string): Promise<void> {
  channel.sendToQueue(process.env.AMQP_QUEUE!, Buffer.from(message));
}

async function close(channel: Channel, connection: Connection): Promise<void> {
  await channel.close();
  await connection.close();
}

export { connect, sendToQueue, close };
