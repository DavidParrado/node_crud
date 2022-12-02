const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



const autenticarUsuario = async(req, res) => {

    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({ email });
    if( !usuario ) { 
        return res.json({ msg: 'El correo o la contraseña estan mal'})
    }

    if( !bcryptjs.compareSync( password, usuario.password )) {
        return res.json({ msg: 'El correo o la contraseña estan mal'})
    };
    
    const payload = { uid: usuario.id };

    const token = jwt.sign( payload, process.env.SECRETKEY, { 
        expiresIn: '4h'
    });
    
    res.json({ 
        usuario,
        token
    });
}


module.exports = { 
    autenticarUsuario
}