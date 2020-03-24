const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async create(req, res){
    const { name, email, whatsap, city, uf} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsap,
      city,
      uf
    })
   
    return res.json({id});

  },

  async index(req, res) {
    const ongs = await connection('ongs').select("*");
  
    return res.json(ongs);
  }


}