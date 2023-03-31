const { sequelize } = require("../../connection");
const { TopicModel } = require("../../model/topics.model");
const topicsService = require("../../service/topics.service");

const listar = async function (req, res) {
    console.log("listar topicos controller");
    try {
        const topics = await topicsService.listar(req.query.listar || "");
        if (topics) {
            res.json({
                succes: true,
                topicos: topics,
            });
        } else {
            res.json({
                succes: true,
                topicos: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const buscarPorCodigo = async function (req, res) {
    console.log("consultar 1 topico por codigo");
    try {
        const topicModelResult = await topicsService.buscarPorCodigo(req.params.filtro || "");
        if (topicModelResult) {
            res.json({
                succes: true,
                topic: topicModelResult,
            });
        } else {
            res.json({
                succes: true,
                topico: [],
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message,
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar topicos");
    let topicoRetorno = null;
    try {
        let topicoRetorno = await topicsService.actualizar(req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.topic_id,
            req.body.order,
            req.body.priority,
            req.body.user_id,
            req.body.color,
            req.body.owner_user_id
        );
    res.json({
        success: true,
        user: topicoRetorno
    })
} catch (error) {
    console.log(error);
    res.json({
        success: false,
        error: error.message
    });
}
};

/*const actualizar = async function (req, res) {
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
};*/

const eliminar = async function (req, res) {
console.log("eliminar topicos");
try {
    await topicsService.eliminar(req.params.filtro || '');
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

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};