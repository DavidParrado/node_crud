const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String, 
        required: [ true, 'El nombre es obligatorio' ] 
    },
    lastname: {
        type: String, 
        required: [ true, 'El lastname es obligatorio' ]
    },
    email: {
        type: String, 
        unique: true, 
        required: [ true, 'El email es obligatorio' ], 
        match:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String, 
        required: [ true, 'El password es obligatorio' ]
    },
    estado: { 
        type: Boolean,
        default: true
    }

});

module.exports = model('Usuarios', userSchema);