import Incident from '../models/Incident';
import File from '../models/File';
import Ong from '../models/Ong';

class IncidentController {

  async index (req, res){
    const { page = 1} = req.query;

    const incidents = await Incident.findAll({
      attributes: ['id', 'title', 'description', 'value'], 
      include: [{
        model: Ong, 
        as: 'ong',
        attributes: ['id', 'email', 'name', 'city', 'uf', 'whatsapp'],
      },{
        model: File,
        as: 'foto',
        attributes: ['id', 'path', 'url'],
      }

    ],
      limit: 5,
      offset: (page - 1) * 5,
      
    })

    // const [count] = await connection('incidents').count();

    // const incidents = await connection('incidents')
    // .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    // .limit(5)
    // .offset((page -1) * 5)
    // .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.city', 'ongs.uf']) ;

    // res.header("X-Total-Count", count['count(*)']);

    return res.json(incidents);
  }

  async create (req, res){
    const { title, value, description, file_id } = req.body;

    const ong_id = req.userId;

    const incident = await Incident.create({
      title,
      description,
      value,
      ong_id,
      file_id,
    })

    return res.json(incident);
  }

  async delete(req, res){
    const { id } = req.params;

    const incident = await Incident.findOne({
      where: { id }
    })

    if(incident.ong_id !== req.userId){
      return res.status(401).json({error: "Operação não permintida"});
    }

    await incident.destroy();

    return res.send();

  }

 
  
}

export default new IncidentController();