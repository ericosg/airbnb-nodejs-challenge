'use strict';

const DbService = require('../services/db');
const haversine = require('../helpers/haversine');

class ChallengeController {
    async process(countPeople) {
        const houses = await this.getHouses();
        const housesWithFees = this.calculateChallenge(houses);
        return this.findCheapest(housesWithFees);
    }

    async getHouses() {
        return await DbService.execute(async function (listingsAndReviews) {
            return await listingsAndReviews.find({ property_type: "House", "address.location.coordinates": { $exists: true } }, { projection: { "address.location": 1, price: 1 } }).limit(100).toArray();
        });
    }

    calculateChallenge(houses) {
        let pairsList = [];
        for (let i = 0; i < houses.length; i++) {
            let pairs = { houses: this.pairNearHouses(houses, i) };
            if (pairs.houses.length) {
                pairs.houses.push(houses[i]);
                pairs.fees = this.calculateFees(pairs.houses);
                pairsList.push(pairs);
            }
        }
        return pairsList;
    }

    pairNearHouses(houses, index) {
        return houses.filter((house, i) => i != index && haversine(house.address.location, houses[index].address.location, { threshold: 500, unit: 'meter', format: 'geojson' }));
    }

    calculateFees(houses) {
        return houses.reduce((p, c) => p + Number(c.price ?? 0), 0);
    }

    findCheapest(list) {
        return list.reduce((p, c) => c.fees < p.fees ? c : p, { fees: Infinity });
    }
}

module.exports = ChallengeController;