import Incident from '../models/Incident';

class IncidentController {

  async index (req, res){
    const { page = 1} = req.query;

    const incidents = await Incident.findAll({
      where: { ong_id: req.userId },
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
    const { title, value, description } = req.body;

    const ong_id = req.userId;

    const incident = await Incident.create({
      title,
      description,
      value,
      ong_id,
    })

    return res.json(incident);
  }
  
  // async delete(req, res){
  //   const { id } = req.params;
  //   const ong_id = req.headers.authorization;

  //   const incident = await connection('incidents')
  //   .where('id', id)
  //   .select('ong_id')
  //   .first()

  //   if(incident.ong_id !== ong_id){
  //     return res.status(401).json({error: "Operation not permmitted"});
    
  //   }

  //   await connection('incidents').where('id', id).delete();

  //   return res.status(204).send();
  // }

 
  
}

export default new IncidentController();