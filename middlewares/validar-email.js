const { request, response } = require('express');
const Usuario = require('../models/usuarios');

const validarEmail = async( req = request, res = response, next ) => {
    const { id } = req.params;
    const { email }  = req.body;
    const usuario = await Usuario.findById( id );


    if( email ) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if( !email.match( re ) ) { 
            return res.json({ msg: 'El correo no es valido'})
        }

        const emailExiste = await Usuario.findOne({ email });
        if( emailExiste && usuario.email !== email ) { 
            return res.json({ msg: `Lo sentimos el correo ${ email } ya está en uso`})
        }

    } 

    next();

    
    
}

module.exports = { 
    validarEmail
}
