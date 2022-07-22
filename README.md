# airbnb-nodejs-challenge
The code monkey and I debated that C# and Node.js will perform differently as APIs. I'll prove Node.js wins.

## Node.js vs C# Challenge:

By using this dataset https://www.mongodb.com/docs/atlas/sample-data/sample-airbnb/
create a API in C# that delivers an endpoint as a JSON result
that returns houses ( `property_type` == `house` ) 
can accommodate X people provided by the POST request
using `accommodates` field
at the cheapest price, combining multiple residencies
given that the houses must be within walking distance from each other
assuming that walking distance is less than 500m

The algorithm must search the entire database (globally) to find the answer
and use server-side geolocation calculations (and not database side calculations, despite being more efficient)
to search and match all possible combinations and return the single best result

Note that the price must sum all the fees:
```"price": {
    "$numberDecimal": "80.00"
  },
  "security_deposit": {
    "$numberDecimal": "200.00"
  },
  "cleaning_fee": {
    "$numberDecimal": "35.00"
  },
  "extra_people": {
    "$numberDecimal": "15.00"
  }
```

`guests_included` can be ignored

The distance must be calculated using the Haversine formula
and the algorithm must match within both solutions.

The test cases are yet to be determined.

The solution must run on the latest stable versions of both stacks, and must be able to run on Ubuntu and Linux.