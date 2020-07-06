import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
const routes = new Router();

import authMiddlewre from './app/middleware/auth';
import multerConfig from  './config/multer';
const upload = multer(multerConfig);

import OngController from './app/Controllers/OngController';
import SessionController from './app/Controllers/SessionController';
import ProfileController from './app/Controllers/ProfileController';
import IncidentController from './app/Controllers/IncidentController';
import FileController from './app/Controllers/FileController';


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


routes.post('/files', upload.single('file'), FileController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),  IncidentController.index);


routes.use(authMiddlewre);
routes.get('/profile', ProfileController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(15),
    description: Joi.string().required(),
    value: Joi.number().required().min(2),
    file_id: Joi.number().required(),
  }),
  
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),  
  })
}),  IncidentController.delete);


export default routes;