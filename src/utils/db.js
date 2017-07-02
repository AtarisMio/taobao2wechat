const { mongodb } = require('./../../config');
const MongoClient = require('mongodb').MongoClient;

module.exports = (app) => {
    MongoClient.connect(mongodb, (err, db) => {
        if (null === err) {
            app.db = db;
            app.db_insert = (obj) => db.collection('taobaoData').insertOne(obj);
            app.db_find = (obj) => db.collection('taobaoData').findOne(obj);
            app.db_update = (id, obj) => db.collection('taobaoData').updateOne({ id }, obj);
            console.log('Connected correctly to server');
        } else {
            console.log('something error!', err);
        }
    });
}
