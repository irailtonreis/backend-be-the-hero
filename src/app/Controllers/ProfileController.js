import File from '../models/File';
import Incident from '../models/Incident';

class ProfileController{
  async index (req, res){
    const ong = await Incident.findAll({
      where: {
        ong_id: req.userId,
      },
      include: [{
        model: File,
        as: 'foto',
        attributes: ['id', 'path', 'url'],
      }
      ],
    })

    return res.json(ong);
  }
}

export default new ProfileController();