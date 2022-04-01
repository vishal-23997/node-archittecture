import mqtt from 'mqtt';
const setting:object = {clientId:"chetan_sub",username:"vishal23997",password:"12345"}
const client:mqtt.MqttClient = mqtt.connect('mqtt://localhost:1883',setting)
//console.log(client);
console.log("Sub_Before connection")

client.on('connect', function () {
    console.log("Sub_Connected before interval")

    console.log("Before subscribe")
    client.subscribe('News');
    console.log("client subscribed to topic News");
});

client.on('message',function (topic:any,message:any) {
    
    const context:string = message.toString();
    console.log(context);
});
