// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234') // port :1234
var topic = 'LINTANGtest123'   
var message = 'Hello World!'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message)  // publish function  
        console.log('Message sent!', message)
    }, 5000)
})