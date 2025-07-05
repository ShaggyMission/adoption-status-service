const express = require('express');
const statusRoutes = require('./routes/status.routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/adoptionStatus-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
app.use(statusRoutes);

module.exports = app;
