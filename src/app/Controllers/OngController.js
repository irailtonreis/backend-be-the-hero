import Ong from '../models/Ong';
class OngController {

  async store(req, res){

    const emailExists = await Ong.findOne({ where:{ email: req.body.email }})

    if(emailExists){
      return res.status(401).json({error: "Email já existe"})
    } 

    const ong = await Ong.create(req.body);

    return res.json(ong);
  }

  async index(req, res) {
    const ongs = await Ong.findAll({
      attributes: ['name','email', 'whatsapp', 'city', 'uf'],
    });
  
    return res.json(ongs);
  }


}

export default new OngController();
