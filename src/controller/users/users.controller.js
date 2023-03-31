const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/user.model");
const UserService = require("../../service/users.service");

const listar = async function (req, res) {
console.log("listar usuarios controller");

    try {
        const users = await UserService.listar(req.query.filtro || '');
        if (users && users[0]) {
            res.json({
                success: true,
                usuarios: users
            });
        } else {
            res.json({
                success: true,
                usuarios: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.mesaje
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("Consultar 1 usuario por codigo");
    try {
        const userModelResult = await UserService.consultarPorCodigo(req.params.filtro || "");
        if (userModelResult) {
            res.json({
                success: true,
                usuario: userModelResult
            });
        } else {
            res.json({
                success: true,
                usuario: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
        console.log("actualizar usuarios");
        let usuarioRetorno = null;
        try {
            usuarioRetorno = await UserService.actualizar(req.body.id,
                req.body.name,
                req.body.last_name,
                req.body.avatar,
                req.body.email,
                req.body.password,
                req.body.deleted);
        res.json({
            success: true,
            user: usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("eliminar usuarios");
    try {
        await UserService.eliminar(req.params.filtro || '');
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar };
