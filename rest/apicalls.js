import cors from "cors";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import data from './API/data.js';
import index from './API/index.js';
import login from './API/login.js';

const swaggerDocument = YAML.load('./openapi/api.yaml');
const app = express();
app.use(express.json());

app.use(cors());

app.use('/doc', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));
app.use('/', index);
app.use('/data', data);
app.use('/login', login);

export default app;