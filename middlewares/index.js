const validarCampos = require('./validar-campos');
const validarEmail = require('./validar-email');
const validarId = require('./validar-id');
const validarJwt = require('./validar-jwt');

module.exports = { 
    ...validarCampos,
    ...validarEmail,
    ...validarId,
    ...validarJwt,
}