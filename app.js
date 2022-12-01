const Server = require('./models/server');
require('dotenv').config();

const server = new Server();
server.listen();
// Aqui se va a ejecutar el servidor 
