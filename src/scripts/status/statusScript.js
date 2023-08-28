import mqtt from 'mqtt';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

export default function createPool() {
  return new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: Number(process.env.DB_PORT),
  });
}

const pool = createPool();

const getAllRelayStatusTopicsQuery = `SELECT topic FROM relays LEFT JOIN device_status ON device_status.relayId = relays.id`;

try {
    const result = await pool.query(getAllRelayStatusTopicsQuery);
    const topics = result.rows.map(row => `${row.topic}/ping`);
    console.log('topics: ', topics);

    const brokerUrl = process.env.MQTT_BROKER_ADDRESS;
    const options = {
        clientId: 'status-script-client',
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
    };

    const client = mqtt.connect(brokerUrl, options);

    const lastMessageTimes = {};
    topics.forEach(topic => {
        lastMessageTimes[topic] = Date.now();
    });

    const messageMissingFlags = {};
    topics.forEach(topic => {
        messageMissingFlags[topic] = false;
    });

    const expectedMessageInterval = 20000;

    client.on('connect', () => {
        console.log('Status script connected to MQTT broker');
        topics.forEach(topic => {
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to topic: ${topic}`);
                }
            });
        });
    });

    client.on('message', (receivedTopic, message) => {
        console.log(`Received message on topic "${receivedTopic}": ${message}`);
        lastMessageTimes[receivedTopic] = Date.now();
        messageMissingFlags[receivedTopic] = false;
    });

    setInterval(() => {
        topics.forEach(topic => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - lastMessageTimes[topic];

            if (elapsedTime >= expectedMessageInterval && !messageMissingFlags[topic]) {
                console.log(`Expected message is missing on topic "${topic}".`);
                messageMissingFlags[topic] = true;
            }
        });
    }, 1000);

    client.on('error', (error) => {
        console.error('MQTT Error:', error);
    });
} catch (error) {
    console.log('Could not fetch relay status topics');
}
