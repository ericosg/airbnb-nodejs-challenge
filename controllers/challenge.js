'use strict';

const DbService = require('../services/db');
const haversine = require('../helpers/haversine');

class ChallengeController {
    constructor(people) {
        this.people = people;
    }

    async process() {
        const houses = await this.getHouses();
        const housesWithFees = this.calculate(houses);
        return this.findCheapest(housesWithFees);
    }

    async getHouses() {
        return await DbService.execute(async function (listingsAndReviews) {
            return await listingsAndReviews.find({ property_type: "House" }, { projection: { "address.location": 1, price: 1, security_deposit: 1, cleaning_fee: 1, extra_people: 1, accommodates: 1 } }).toArray();
        });
    }

    calculate(houses) {
        let pairsList = [];
        for (let i = 0; i < houses.length; i++) {
            const house = houses[i];
            let pairs = { houses: [house] };
            if (!this.accomodate(pairs, pairsList)) {
                const pairHouses = this.pairNearHouses(houses, i);
                if (pairHouses.length) {
                    pairs.houses.push(...pairHouses);
                    this.accomodate(pairs, pairsList);
                }
            }
        }
        return pairsList;
    }

    pairNearHouses(houses, index) {
        return houses.filter((house, i) => i != index && haversine(house.address.location, houses[index].address.location, { threshold: 500, unit: 'meter', format: 'geojson' }));
    }

    accomodate(pairs, pairsList) {
        if (this.countAccomodation(pairs.houses) >= this.people) {
            pairs.fees = this.calculateFees(pairs.houses);
            pairsList.push(pairs);
            return true;
        } else {
            return false;
        }
    }

    countAccomodation(houses) {
        return houses.reduce((p, c) => p + c.accommodates, 0);
    }

    calculateFees(houses) {
        return houses.reduce((p, c) => p + this.calculateFee(c), 0);
    }

    calculateFee(house) {
        return Number(house.price ?? 0) +
            Number(house.security_deposit ?? 0) +
            Number(house.cleaning_fee ?? 0) +
            Number(house.extra_people ?? 0) * this.people;
    }

    findCheapest(list) {
        return list.reduce((p, c) => c.fees < p.fees ? c : p, { fees: Infinity });
    }
}

module.exports = ChallengeController;