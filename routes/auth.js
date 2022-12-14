const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { autenticarUsuario } = require('../controllers/auth');

const router = Router();

router.get('/login', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],autenticarUsuario);


module.exports = router;