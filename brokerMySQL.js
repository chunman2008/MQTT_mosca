// MQTT broker
var mosca = require('mosca')
var settings = { port: 1234 } // set port  
var broker = new mosca.Server(settings) 

// MySQL 
var mysql = require('mysql')   // connect  to mysql 
var db = mysql.createConnection({
    host: 'localhost',
    user: 'mqtt',          // user name
    password: 'mqtt',     // user password
    database: 'mqttjs'   // database name
})

db.connect(() => {
    console.log('Database connected!')
})


broker.on('ready', () => {
    console.log('Broker is ready!')
})

broker.on('published', (packet) => {
    message = packet.payload.toString()  
    Topic = packet.topic.toString()
    if (message.slice(0, 1) != '{' && message.slice(0, 4) != 'mqtt') {
        var dbStat = 'insert into message set ?'   // inser into message table
        var data = {
            Message: message,    // Message column 
            Topic: Topic         // Topic  column 

        }
        db.query(dbStat, data, (error, output) => {
            if (error) {
                console.log(error) //print error message 
            } else {
                console.log('Data saved to database!') 
            }
        })
    }
})