const { request, response } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');

const obtenerUsuarios = async( req = request, res = response ) => {

    console.log( req )
    const { limite = 5, name, email, lastname, order, by } = req.query;

    const orderBy = {};
    const ordenPermitido = ['asc','desc', 'ascending', 'descending', 1, -1 ];

    if( order && ordenPermitido.includes( by ) ) { 

        if( order === 'name' ) { orderBy.name = by } 
        if( order === 'email' ) { orderBy.email = by } 
        if( order === 'lastname' ) { orderBy.lastname = by } 

    }

    const field = {};

    if( name ) { 
        const termino =  new RegExp(name,'i');
        field.name = termino;
    }

    if( lastname ) { 
        const termino =  new RegExp(lastname,'i');
        field.lastname = termino;
    }

    if( email ) { 
        const termino =  new RegExp(email,'i');
        field.email = termino;
    }


    const usuarios = await Usuario.find( field ) 
                        .limit( limite )
                        .sort( orderBy )  

    if( usuarios.length === 0 ) { 
        return res.json({ msg: 'No encontramos usuarios con esas caracteristicas'})
    }
           
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
    
    const { id, password: oldPassword } = req.usuario;
    const { password, estado, ...resto }  = req.body;
    
    

    if( password && oldPassword !== password ) { 
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

    if( !req.usuario.estado ) {
        return res.json({ msg: 'El id a eliminar no existe en la base de datos'})
    }
    const id = req.usuario.id; 

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true });
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