const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerUsuario, obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.js');

const { validarId, validarCampos, validarEmail, validarJwt } = require('../middlewares/index');

const { idExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerUsuarios);

router.get('/:id', [
    check('id').custom( idExiste ),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
], obtenerUsuario);

router.post('/', crearUsuario);

router.put('/:id',[
    validarId,
    check('id').custom( idExiste ),
    validarEmail,
    validarJwt,
    validarCampos
], actualizarUsuario)

router.delete('/:id',[
    validarId,
    validarJwt,
    check('id').custom( idExiste ),
    validarCampos
], borrarUsuario)

module.exports = router;