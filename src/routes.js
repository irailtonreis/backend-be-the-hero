import { Router } from 'express';
const { celebrate, Segments, Joi } = require('celebrate');
const routes = new Router();


import OngController from './app/Controllers/OngController';
import SessionController from './app/Controllers/SessionController';


routes.post('/sessions',celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}), SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}, {
  abortEarly: false
}) , OngController.store);

// routes.get('/incidents', celebrate({
//   [Segments.QUERY]: Joi.object().keys({
//     page: Joi.number(),
//   })
// }),  IncidentController.index);

// routes.post('/incidents', celebrate({
//   [Segments.HEADERS]: Joi.object({
//     authorization: Joi.string().required(),
//   }).unknown(),

//   [Segments.BODY]: Joi.object().keys({
//     title: Joi.string().required().min(15),
//     description: Joi.string().required(),
//     value: Joi.number().required().min(2),
//   }),
  
// }), IncidentController.create);

// routes.delete('/incidents/:id', celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//       id: Joi.number().required(),  
//     })
// }),  IncidentController.delete);


// routes.get('/profile', celebrate({
//   [Segments.HEADERS]: Joi.object({
//     authorization: Joi.string().required(),
//   }).unknown(),
// }), ProfileController.index);


export default routes;