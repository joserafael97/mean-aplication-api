import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        info:{
            title:"Sistema de Avaliação de Profissionais API",
            version: "1.0.0",
            description: ""
        },
        basePath:'/',
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}