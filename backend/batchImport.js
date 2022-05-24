const { MongoClient } = require("mongodb");

const { flights, reservations } = require("./data");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    const client = new MongoClient(MONGO_URI, options);

    console.log("Connecting to DB");
    await client.connect();
    const db = await client.db("slingair");

    // to read the content of a collection,
    // use .find().toArray()
    // const content = await db.collection("seats").find().toArray();
    // console.log(content);

    /*
      {
        flight: "SA231"
        seats: [{...}, {...}, {...}, ...]
      }
    */
    console.log("Inserting flights into flights collection");
    const flightNumber = Object.keys(flights);

    const flightMap = flightNumber.map((flightNum) => {
      return { flight: `${flightNum}`, seats: flights[flightNum] };
    });

    await db.collection("flights").insertMany(flightMap);

    // flightNumber.forEach(async (flightNum) => {
    //   await db.collection("flights").insertOne({
    //     // _id: `${flightNum}`,
    //     flight: `${flightNum}`,
    //     seats: flights[flightNum],
    //   });
    // });

    console.log(await db.collection("flights").find().toArray());

    console.log("Inserting reservations into reservations collection");
    await db.collection("reservations").insertMany(reservations);
    console.log(await db.collection("reservations").find().toArray());

    client.close();
    console.log("Closing connection to DB");
  } catch (err) {
    console.error(error);
  }
};

batchImport();
