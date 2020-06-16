import jwt from 'jsonwebtoken';
import Ong from '../models/Ong';
import authConfig from '../../config/auth';
class Session {
  async create (req, res){
  
    const { email, password } = req.body;

    const ong = await Ong.findOne({where: { email }})

    if(!ong){
      return res.status(400).json({ error: "ONG não encontrada"})
    }

    if(!(await ong.checkPassword(password))){
      return res.status(401).json({error: 'Senha inválida'})
    }

    const { id, name, whatsapp, city, uf } = ong;


    return res.json({
      ong: {
        id,
      name,
      email,
      whatsapp,
      city,
      uf
      },
      token: jwt.sign({id}, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      }) 
    }); 
  }
}


export default new Session();