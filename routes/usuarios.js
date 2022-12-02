const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerUsuario, obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarEmail } = require('../middlewares/validar-email.js');
const { idExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerUsuarios);

router.get('/:id', [
    check('id').custom( idExiste ),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
], obtenerUsuario);

router.post('/', crearUsuario)

router.put('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarEmail,
    validarCampos
], actualizarUsuario)

router.delete('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
], borrarUsuario)

module.exports = router;