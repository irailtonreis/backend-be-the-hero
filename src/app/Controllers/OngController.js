import Ong from '../models/Ong';
module.exports = {

  async create (req, res){
    console.log(req.body)
    const ong = await Ong.create(req.body);

    return res.json(ong);
  },

  async index(req, res) {
    const ongs = await Ong.findAll();
  
    return res.json(ongs);
  }


}