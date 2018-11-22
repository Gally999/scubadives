require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const Divesite = require("../models/divesite-model");
const Divelog = require("../models/divelog-model");

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Creation of divelogs
const divelog = [
    {
    diveNb: 1,
    divesite:{
      name: "USAT Liberty",
      city: "Tulamben",
      country: "ID",
      rating: 5,
    },
    date: 2018-01-21,
    depthInfo: "m",
    depth: 20,
    weightNb: 5,
    weightInfo: "kg",
    suitThickness: "5mm",
    airInfo: "bars",
    airInNb: 220,
    airOut: 50,
    diveTime: 43,
    entryTime: "11:00",
    exitTime: "11:43",
    user: {
      firstName: "Dave",
      lastName: "Grohl",
      nationality: "US",
      email: "dave@grohl.com",
      encryptedPassword: bcrypt.hashSync("Truc1", 10),
      organization: "PADI",
      certNb: "1403AH7879",
      mainCert: "Advanced Open Water",
      speciality: ["Cave Diver"],
      role: "diver",
      isShopowner: false
    },
    seen:  ["Turtles"] ,
    comments: "C'était supair !",
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, {
    diveNb: 1,
    divesite:{
      name: "Blue Hole",
      city: "Belize City",
      country: "BZ",
      rating: 5,
    },
    date: 2018-02-21,
    depthInfo: "m",
    depth: 20,
    weightNb: 5,
    weightInfo: "kg",
    suitThickness: "5mm",
    airInfo: "bars",
    airInNb: 220,
    airOut: 50,
    diveTime: 43,
    entryTime: "11:00",
    exitTime: "11:43",
    user: {
        firstName: "Winny",
        lastName: "the Bear",
        nationality: "CA",
        email: "winny@blueforest.com",
        encryptedPassword: bcrypt.hashSync("Truc3", 10),
        organization: "PADI",
        certNb: "0909WY0909",
        mainCert: "Scuba Diver",
        speciality: "Drift Diver",
        role: "diver",
        isShopowner: false
    },
    seen:  ["Turtles"] ,
    comments: "Amazingly blue!",
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  },
  {
    diveNb: 1,
    divesite: {
      name: "Playa Blanca",
      city: "Playa Blanca",
      country: "ES",
      rating: 3
    },
    date: 2018 - 01 - 21,
    depthInfo: "m",
    depth: 20,
    weightNb: 5,
    weightInfo: "kg",
    suitThickness: "5mm",
    airInfo: "bars",
    airInNb: 220,
    airOut: 50,
    diveTime: 43,
    entryTime: "11:00",
    exitTime: "11:43",
    user: {
      firstName: "Water",
      lastName: "Bottle",
      nationality: "NZ",
      email: "water@bottle.com",
      encryptedPassword: bcrypt.hashSync("Truc4", 10),
      organization: "SDI",
      certNb: "0808WB0060",
      mainCert: "Adventure Diver",
      role: "diver",
      isShopowner: false
    },
    seen: ["Turtles"],
    comments: "We can see angel sharks!",
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller"
  },
  {
    diveNb: 1,
    divesite: {
      name: "Secca di Capistello",
      city: "Lipari",
      country: "IT",
      rating: 2
    },
    date: 2018 - 01 - 21,
    depthInfo: "m",
    depth: 20,
    weightNb: 5,
    weightInfo: "kg",
    suitThickness: "5mm",
    airInfo: "bars",
    airInNb: 220,
    airOut: 50,
    diveTime: 43,
    entryTime: "11:00",
    exitTime: "11:43",
    user: {
      firstName: "See",
      lastName: "Bottle",
      nationality: "NZ",
      email: "seewater@bottle.com",
      encryptedPassword: bcrypt.hashSync("Truc5", 10),
      organization: "SDI",
      certNb: "080ED45060",
      mainCert: "Adventure Diver",
      role: "diver",
      isShopowner: false
    },
    seen: ["Turtles"],
    comments: "C'était supair !",
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller"
  },
  {
    diveNb: 1,
    divesite: {
      name: "Manta Point",
      city: "Bali",
      country: "ID",
      rating: 5
    },
    date: 2018 - 01 - 21,
    depthInfo: "m",
    depth: 20,
    weightNb: 5,
    weightInfo: "kg",
    suitThickness: "5mm",
    airInfo: "bars",
    airInNb: 220,
    airOut: 50,
    diveTime: 43,
    entryTime: "11:00",
    exitTime: "11:43",
    user: {
      firstName: "Aaron",
      lastName: "Martin",
      nationality: "SG",
      email: "aaron@martin.com",
      encryptedPassword: bcrypt.hashSync("Truc1", 10),
      organization: "PADI",
      certNb: "1801AD7879",
      mainCert: "Advanced Open Water",
      speciality: ["Cave Diver", "Wreck Diver"],
      role: "diver",
      isShopowner: false
    },
    seen: ["Turtles"],
    comments: "C'était supair !",
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller"
  }
];

divelog.forEach(oneDiveLog => {
  Divesite.create(oneDiveLog.divesite)
    .then(divesiteDoc => {
      console.log(`created divesite ${divesiteDoc.name}`);
      oneDiveLog.divesite = divesiteDoc._id;
      return User.create(oneDiveLog.user).then(userDoc => {
        console.log(`created divers ${userDoc.firstName} ${userDoc.lastName}`);
        oneDiveLog.user = userDoc._id;
        return Divelog.create(divelog).then(divelogDoc => {
          console.log(
            `divelog created with divesite schema and user schema ${
              divelogDoc.diveNb
            }`
          );
        });
      });
    })
    .catch(err => console.log(`create fail!`));
});