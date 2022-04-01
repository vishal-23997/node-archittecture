const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port:number = 1883
//const jwt = require('jsonwebtoken');

server.listen(port, function () {
    console.log('Server is listening to ', port)
})

aedes.on("client", function (client:any) {
    //console.log(client);
    console.log(client.id + " is connected")
})

aedes.on('clientDisconnect', function (client:any) {

    console.log(client.id + " is Disconnected")
})

// aedes.preConnect = function(client, packet, callback) {
//     console.log("after preconnect");
//     callback(new Error('connection error'), client.conn.remoteAddress === 'mqtt://localhost:1883');
//     console.log("after callback");
// }

// server.on('close',function(client){
//     console.log("clinet"+client+" disconnected");
// })

aedes.authenticate = (client:any, username:any, password:any, cb:any) => {
    //password = Buffer.from(password, 'base64').toString();
    if (username == "vishal23997" && password =="12345") {
        return cb(null, true);
    }
    else {
        // var error = new Error('Auth error')
        // error.returnCode = 4
        // cb(error.returnCode);
        return console.log(client.id," authetication failed");
    }
}
