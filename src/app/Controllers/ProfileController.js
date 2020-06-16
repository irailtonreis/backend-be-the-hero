import Ong from '../models/Ong';

class ProfileController{
  async index (req, res){
    const ong = await Ong.findByPk(req.userId)

    return res.json(ong);
  }
}

export default new ProfileController();