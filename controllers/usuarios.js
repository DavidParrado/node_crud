const { request, response } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');

const obtenerUsuarios = async( req = request, res = response ) => {
    const { limite = 5,  } = req.query;

    const usuarios = await Usuario.find()
                    .limit( limite )
           
    res.json( usuarios );
};

const obtenerUsuario = async( req = request, res = response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findById( id );
    if( !usuario ) { 
        return res.status(404).json({ msg:`No se encontró un usuario con el id ${ id }`});
    }

    res.json( usuario );

}

const crearUsuario = async( req = request, res = response ) => {
    
    const { name, lastname, email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if( existeEmail ) { 
        return res.json({ error: `Ya existe un usuario con el correo ${ email }`});
    }

    const usuario = new Usuario({ name, lastname, email, password });
    
    const error = usuario.validateSync();
    if( error ) return res.json(error);
    

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );
    
    await usuario.save();
    res.json( usuario );
        
};


const actualizarUsuario = async( req = request, res = response ) => {
    
    const { id } = req.params;
    const { email, password, estado, ...resto }  = req.body;
    
    if( email ) {

        if( !email.match( re ) ) { 
            return res.json({ msg: 'El correo no es válido'})
        }
        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ) { 
            return res.json({ error: `Ya existe un usuario con el correo ${ email }`});
        }
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    

        resto.email = email;
    } 

    if( password ) { 
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );    
    }


    const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true })

    if( !usuario ) { 
        return res.json({ msg: `No existe un usuario con el id ${ id } en la base de datos`})
    }

    res.json( usuario );

};

const borrarUsuario = async( req = request, res = response ) => {
    
    const { id } = req.params; 

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    if( !usuario ) { 
        return res.json({ msg: 'Usuario no encontrado'})
    }
    
    res.json(usuario);
};

module.exports = { 
    obtenerUsuario,
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};