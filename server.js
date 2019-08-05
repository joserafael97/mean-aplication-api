import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import config from './config/config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc';
import 'babel-polyfill';

import funcionarioRoutes from "./src/routes/funcionario.route";
import autenticaRoutes from "./src/routes/autenticacao.routes";
import formularioRoutes from "./src/routes/formulario.route";
import avaliacaoRoutes from "./src/routes/avaliacao.route"

process.env.NODE_ENV = 'development';

const app = express();


app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect(global.gConfig.url_db)


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use('/api/v1/funcionario', funcionarioRoutes);
app.use('/api/v1/autenticacao', autenticaRoutes);
app.use('/api/v1/formulario', formularioRoutes);
app.use('/api/v1/avaliacao', avaliacaoRoutes);

swaggerDoc(app)

app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});

export default app;
