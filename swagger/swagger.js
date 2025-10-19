const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Enviroment API',
            version: '1.0.0',
            description: 'API for managing enviroments',
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Introduce the jwt in the format: Bearer <token>'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/*/controller/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs;