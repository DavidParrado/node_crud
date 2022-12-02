const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');

const validarPassword = async( req, res, next ) => {

    const { id } = req.params

    const { password } = req.body;
    if( password ) { 
        const usuario = await Usuario.findById( id );

        if( bcryptjs.compareSync( password, usuario.password )) { 
            return res.json({ msg: 'La contraseña es la misma'})
        }
    }

    next()
}

module.exports = {
    validarPassword
}