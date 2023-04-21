const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const userRoute = require("./study_app_project_backend/src/route/users/users.route");
const themesRoute = require("./study_app_project_backend/src/route/themes/themes.route");
const topicsRoute = require("./study_app_project_backend/src/route/topics/topics.route");
const themes_propertiesRoute = require("./study_app_project_backend/src/route/themes_properties/themes_properties.route"); 
 
//Ruta raiz
app.get('/', function (req, res) {
    //Logica.
    res.send('Hello World');
});

app.get('/pagina2', function (req, res) {
    res.json({application: 'Study APP', version: '1.0.0'});
});

//Llamadas a los routes
userRoute(app);
themesRoute(app);
topicsRoute(app); 
themes_propertiesRoute(app);

app.listen(3000);