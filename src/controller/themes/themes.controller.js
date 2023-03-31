const { sequelize } = require("../../connection");
const { ThemeModel } = require("../../model/themes.model");
const ThemesService = require("../../service/themes.service");

const listar = async function (req, res) {
    console.log("listar temas");

    try {
        const themes = await ThemesService.listar(req.query.filtro || '');
        if (themes && themes) {
            res.json({
                succes: true,
                temas: themes
            });
        } else {
            res.json({
                succes: true,
                temas: []
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
    console.log("consultar 1 tema por codigo");
    try {
        const themesModelResult = await ThemesService.consultarPorCodigo(req.params.id);
        if (themesModelResult) {
            res.json({
                success: true,
                temas: themesModelResult
            });
        } else {
            res.json({
                success: true,
                temas: null
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
    console.log("actualizar temas");
    let temaRetorno = null;
    try {
        let temaRetorno = await ThemesService.actualizar(req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.description,
            req.body.keywords,
            req.body.owner_user_id
        );
    res.json({
        success: true,
        user: temaRetorno
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
    console.log("eliminar temas propiedades");
    try {
        const tema_propiedadRetorno =  await ThemesPropertiesService.eliminar(req.params.id);
        res.json({
            success: tema_propiedadRetorno,
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
