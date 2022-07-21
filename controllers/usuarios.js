const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet = (req= request, res = response) => {

    const {q, nombre, apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}


const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //guardar db
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosPut = async(req, res) => {
    
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO: validar contra base de datos
    if (password) {
        //encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
}


const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
}


const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}