"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_autogen_1 = require("swagger-autogen");
var doc = {
    info: {
        version: 'v1.0.0',
        title: "API's for my portfolio",
        description: 'APIs for my portfolio',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'local server',
        },
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'User',
            description: 'User related end-points',
        },
        {
            name: 'Auth',
            description: 'Auth related end-points',
        },
        {
            name: 'Blog',
            description: 'blog related end-points',
        },
        {
            name: 'Project',
            description: 'project related end-points',
        },
        {
            name: 'Message',
            description: 'message related end-points',
        },
        {
            name: 'Skill',
            description: 'skill related end-points',
        },
        {
            name: 'Education',
            description: 'education related end-points',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {},
    definitions: {
        User: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                },
                password: {
                    type: 'string',
                    format: 'password',
                },
            },
        },
        Auth: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                },
                password: {
                    type: 'string',
                    format: 'password',
                },
            },
        },
        Blog: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: {
                    type: 'string',
                },
                content: {
                    type: 'string',
                },
            },
        },
        Project: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: {
                    type: 'string',
                },
                content: {
                    type: 'string',
                },
            },
        },
        Message: {
            type: 'object',
            required: ['name', 'email', 'message'],
            properties: {
                name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                    format: 'email',
                },
                message: {
                    type: 'string',
                },
            },
        },
        Skill: {
            type: 'object',
            required: ['name', 'level'],
            properties: {
                name: {
                    type: 'string',
                },
                level: {
                    type: 'string',
                },
            },
        },
        Education: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: {
                    type: 'string',
                },
                content: {
                    type: 'string',
                },
            },
        },
    },
};
var outputFile = './swagger_output.json';
var endpointsFiles = ['../routers/index.ts'];
(0, swagger_autogen_1.default)({
    openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
