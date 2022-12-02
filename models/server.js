const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../helpers/database');

class Server { 

    constructor() { 
        this.app = express();
        this.port = process.env.PORT
        this.paths = { 
            usuarios: '/api/usuarios',
            auth: '/api/auth'
        };
        
        this.connection();
        this.middlewares();
        this.routes();
    }
    
    async connection() { 
        await dbConnection();        
    }
    
    middlewares() { 
        this.app.use( cors() );
        this.app.use( express.json() )
    }

    routes() { 
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
        this.app.use( this.paths.auth, require('../routes/auth') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor escuchando en el puerto ${ this.port }`)
        })
    }

}


module.exports = Server;