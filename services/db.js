'use strict';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://airbnb_user:ZkTgQK3Oh1NqUfse@airbnb.o7jie9t.mongodb.net/?retryWrites=true&w=majority";

class DbService {
    static async execute(operation) {
        let result;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
            const coll = client.db("sample_airbnb").collection("listingsAndReviews");
            result = await operation(coll);
        } catch (error) {
            console.error(error);
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