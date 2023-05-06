import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const mqttBrokerAddress = process.env.MQTT_BROKER_ADDRESS;
const mqttUserName = process.env.MQTT_USERNAME;
const mqttPassword = process.env.MQTT_PASSWORD;

function sendMqttMessage(mqttTopic: string, mqttMessage: string): void {
  const client: MqttClient = mqtt.connect(mqttBrokerAddress!, {
    username: mqttUserName,
    password: mqttPassword,
  });

  client.on('connect', function () {
    console.log('connected to MQTT broker');
    client.subscribe(mqttTopic, function (err: Error) {
      if (err) {
        console.error(`failed to subscribe to MQTT topic: ${mqttTopic}`);
      } else {
        console.log(`subscribed to MQTT topic: ${mqttTopic}`);
        client.publish(mqttTopic, mqttMessage);
        console.log(`published message: '${mqttMessage}' to MQTT topic: ${mqttTopic}`);
      }
    });
  });

  client.on('error', function (err: Error) {
    console.error('failed to connect to MQTT broker', err);
  });
}

export { sendMqttMessage };
