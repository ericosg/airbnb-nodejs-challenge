'use strict';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://airbnb_user:ZkTgQK3Oh1NqUfse@airbnb.o7jie9t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

class DbService {
    static async execute(operation) {
        let result;
        try {
            const coll = client.db("sample_airbnb").collection("listingsAndReviews");
            result = await operation(coll);
        } catch (error) {
            debug(error);
            if (client) {
                client.close();
            }
            throw error;
        }
        client.close();
        return result;
    }
}

module.exports = DbService;