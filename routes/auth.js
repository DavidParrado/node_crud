const { autenticarUsuario } = require('../controllers/auth');
const { Router } = require('express');
const router = Router();


router.get('/', autenticarUsuario);


module.exports = router;