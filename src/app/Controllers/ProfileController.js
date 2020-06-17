import Ong from '../models/Ong';
import Incident from '../models/Incident';

class ProfileController{
  async index (req, res){

    const ong = await Incident.findAll({
      where: {
        ong_id: req.userId,
      },
    })

    return res.json(ong);
  }
}

export default new ProfileController();