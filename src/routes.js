const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

const OngController = require('./app/Controllers/OngController');
const IncidentController = require('./app/Controllers/IncidentController');
const ProfileController = require('./app/Controllers/ProfileController');
const SessionController = require('./app/Controllers/SessionController');


routes.post('/sessions',celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required().min(8),
  })
}), SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}) , OngController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),  IncidentController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(15),
    description: Joi.string().required(),
    value: Joi.number().required().min(2),
  }),
  
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),  
    })
}),  IncidentController.delete);


routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);


export default routes;