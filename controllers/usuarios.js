const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

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


const usuariosPost = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return req.status(400).json(errors);
    }


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
    
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }
    //encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar db
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosPut = (req, res) => {
    
    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
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