const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJwt = async( req, res, next ) => {
    
    const { id } = req.params;
    const token = req.headers['x-token'];
    if( !token ) {
        return res.json({ msg: 'No hay token en la petición'});
    }

    const usuario = await Usuario.findById( id );
    const { uid } = jwt.verify( token, process.env.SECRETKEY, ( err, decode ) => decode !== undefined ?  decode : err );


    if( usuario.id !== uid ) { 
        return res.json({ 
            msg: 'El token no es valido'
        })
    }
    req.usuario = usuario
    
    next();

};

module.exports = {
    validarJwt
}
