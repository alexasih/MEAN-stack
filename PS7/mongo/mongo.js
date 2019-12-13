const mongoClient = require('mongodb').MongoClient;

const mongoURL = 'mongodb://localhost:27017';

let _db;

module.exports = {

    connect: function( callback ) {
        mongoClient.connect( mongoURL,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
            _db  = client.db('weatherdb');
            return callback( err );
        } );
    },
    getDB: () => { return _db; }

}
