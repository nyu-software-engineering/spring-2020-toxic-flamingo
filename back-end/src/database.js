let mongoose = require('mongoose');
require('dotenv').config();

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
      mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@toxicflamingo-isrgh.mongodb.net/SharmonyData?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true} )
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}


module.exports = new Database()