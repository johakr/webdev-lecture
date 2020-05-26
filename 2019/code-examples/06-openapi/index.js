const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./openapi.json");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
