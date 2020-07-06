import Incident from '../models/Incident';

class IncidentController {

  async index (req, res){
    const { page = 1} = req.query;

    const incidents = await Incident.findAll({
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
    console.log(file_id);

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

    console.log(incident.ong_id)
    console.log(req.userId)
    
    if(incident.ong_id !== req.userId){
      return res.status(401).json({error: "Operação não permintida"});
    }

    return res.json(incident)

    // await connection('incidents').where('id', id).delete();

    // return res.status(204).send();
  }

 
  
}

export default new IncidentController();