const Usuario = require('../models/usuarios.js');

const idExiste = async( id ) => { 

    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ) { 
        throw new Error('No existe ese id en la base de datos');
    }
    

}

module.exports = { 
    idExiste
}
