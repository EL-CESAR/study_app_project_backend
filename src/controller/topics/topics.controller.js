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

const consultarPorCodigo = async function (req, res) {
    console.log("consultar 1 topico por codigo");
    try {
        const topicsModelResult = await topicsService.consultarPorCodigo(req.params.id);

        if (topicsModelResult) {
            res.json({
                success: true,
                topicos: topicsModelResult
            });

        } else {
            res.json({
                success: true,
                topicos: null
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


const eliminar = async function (req, res) {
    console.log("eliminar topicos");
    try {
        const topicoRetorno = await TopicsService.eliminar(req.params.id);
        res.json({
            success: topicoRetorno,
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
    listar, consultarPorCodigo, actualizar, eliminar
};
