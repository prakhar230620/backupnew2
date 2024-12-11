const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NIR Real Estate API',
      version: '1.0.0',
      description: 'API documentation for NIR Real Estate'
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/backend/routes/*.js']
};

module.exports = swaggerJsDoc(swaggerOptions); 