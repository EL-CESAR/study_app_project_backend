const { sequelize } = require("../connection");
const { TopicModel } = require("../model/topics.model");

const listar = async function (textoBuscar) {
    console.log("Listar topicos");
    try {
        const topics = await sequelize.query(`SELECT *
                                             FROM topics
                                             WHERE 1 = 1
                                             AND UPPER(name) LIKE UPPER('%${textoBuscar}%') 
                                             ORDER BY id`);
        if (topics && topics[0]) {
           
                return topics[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (id) {
    console.log("consultar 1 topico por codigo");

    try {
        const topicsModelResult = await TopicModel.findByPk(id);

        if (topicsModelResult) {
            return topicsModelResult;
        } else {
            return null;

        }
    } catch (error) {
        console.log(error);
        throw error;
    }

};


const actualizar = async function (id, create_date, name, topic_id, order, priority, color, user_id, owner_user_id) {
    console.log("actualizar topicos");
    //Variables
        let topicoRetorno = null;
        const data = {id, create_date, name, topic_id, order, priority, color, user_id, owner_user_id};
        try {
        let topicoExiste = null;
        if (id) {
            topicoExiste = await TopicModel.findByPk(id);
        }
        if (topicoExiste) {
            topicoRetorno = await TopicModel.update(data, { where : {id : id}});
            topicoRetorno = data;
        } else {
            
            topicoRetorno = await TopicModel.create(data);
        }
        return topicoRetorno;
    } catch (error) {
       console.log(error);
       throw error;
    }
};

const eliminar = async function (id) {
    console.log("eliminar topicos");

    try {
        await TopicModel.destroy({ where: { id: id } });
        return true;
    } catch (error) {

        console.log(error);
        throw error;


    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};

