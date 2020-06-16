import Ong from '../models/Ong';
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

    return res.json(ong); 
  }
}


export default new Session();