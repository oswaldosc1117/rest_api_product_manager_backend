import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [{
            name: 'Products',
            description: 'API operations related to products'
        }],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },

    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXO6OVb7NNtPBj1md8AZ7Do7PdKyQw_RDpjw&s);
            height: 80px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / TypeScript'
}

export default swaggerSpec
export {
    swaggerUiOptions
}