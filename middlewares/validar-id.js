

const validarId = ( req, res, next ) => {

    const { id } = req.params;

    if ( !id.match(/^[0-9a-fA-F]{24}$/) ) {
        return res.json({msg:'No es un id de mongo'})
    }
    next();
}

module.exports = { 
    validarId
}