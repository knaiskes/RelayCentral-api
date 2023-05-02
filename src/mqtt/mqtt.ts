import mqtt, { MqttClient } from 'mqtt';

const mqttBrokerAddress = 'mqtt://localhost'; // TODO: Use environment variable
const mqttUserName = 'test'; // TODO: Use environment variable
const mqttPassword = 'test'; // TODO: Use environment variable

function sendMqttMessage(mqttTopic: string, mqttMessage: string): void {
    const client: MqttClient = mqtt.connect(mqttBrokerAddress, {
	username: mqttUserName,
	password: mqttPassword
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

export {
    sendMqttMessage,
}
