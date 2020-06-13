import Ong from '../models/Ong';
module.exports = {

  async create (req, res){
    const ong = await Ong.create(req.body);

    return res.json(ong);
  }

  // async index(req, res) {
  //   const ongs = await connection('ongs').select("*");
  
  //   return res.json(ongs);
  // }


}