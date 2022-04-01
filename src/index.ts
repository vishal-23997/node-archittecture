import express, { Application } from "express";
import dbConnection from "./config/dbConn";
import router from "./routes/routes";
import options from "./swagger/swagger";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();

dbConnection;

const port:string | undefined = process.env.PORT;

const app:Application = express();

app.use(express.json());

app.use(router);

const specs:object = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Server started and running on ${port}`);
})

