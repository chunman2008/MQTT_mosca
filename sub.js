// MQTT subscriber function 
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234') // port
var topic = 'LINTANGtest123'

client.on('message', (topic, message)=>{ 
    message = message.toString() //  if subscribed topic receives messages,it will print the message . 

    console.log(message) 
})

client.on('connect', ()=>{
    client.subscribe(topic)  //  subscribe topic
})