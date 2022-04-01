const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "USER crud API's documentation",
            version: "1.0.0",
            description: "A simple Express Library API",
            
        },
        servers: [
            {
                url: `${process.env.SWAGGER_URL}`,
                description: "My API Documentation",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    name: "x-auth-token",
                    scheme: "bearer",
                    in: "header",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/routes.ts"],
};



export default options;

