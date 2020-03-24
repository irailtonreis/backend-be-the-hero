const express = require('express');
const routes = express.Router();

const OngController = require('./Controllers/OngController')
const IncidentController = require('./Controllers/IncidentController')


routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;