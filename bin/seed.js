const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");

mongoose
  .connect('mongodb://localhost/scubadives', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const divers = [
  {
    firstName: "Dave",
    lastName: "Grohl",
    nationality: "US",
    email: "dave@grohl.com",
    encryptedPassword: bcrypt.hashSync("Truc", 10),
    organization: "PADI",
    certNb: "1403AH7879",
    mainCert:"Advanced Open Water",
    speciality: ["Cave Diver"],
    role: "diver",
    isShopowner: false,
  },
  {
    firstName: "Bear",
    lastName: "Grylls",
    nationality: "UK",
    email: "bear@grylls.com",
    encryptedPassword: bcrypt.hashSync("Truc", 10),
    organization: "SSI",
    certNb: "1001AY8819",
    mainCert:"Master Scuba Diver",
    speciality: ["Ice Diver", "Night Diver", "Wreck Diver"],
    role: "diver",
    isShopowner: false,
  },
  {
    firstName: "Winny",
    lastName: "the Bear",
    nationality: "CA",
    email: "winny@blueforest.com",
    encryptedPassword: bcrypt.hashSync("Truc", 10),
    organization: "PADI",
    certNb: "0909WY0909",
    mainCert:"Scuba Diver",
    speciality: "Drift Diver",
    role: "diver",
    isShopowner: false,
  },
  {
    firstName: "Water",
    lastName: "Bottle",
    nationality: "NZ",
    email: "water@bottle.com",
    encryptedPassword: bcrypt.hashSync("Truc", 10),
    organization: "SDI",
    certNb: "0808WB0060",
    mainCert:"Adventure Diver",
    role: "diver",
    isShopowner: false,
  },
  {
    firstName: "Super",
    lastName: "User",
    nationality: "BR",
    email: "super@user.com",
    encryptedPassword: bcrypt.hashSync("Truc", 10),
    organization: "PADI",
    certNb: "1901HT9834",
    mainCert:"Rescue Diver",
    secCert: "Open Water Scuba Instructor" ,
    speciality: ["Altitude Diver", "Boat Diver", "Fish Identification", "Drift Diver", "Peak Performance Buoyancy", "Night Diver", "Wreck Diver", "Dry Suit Diver", "Advanced Rebreather Diver", "Deep Diver", "Cave Diver", "Search and Recovery Diver", "Emergency First Response Provider"],
    role: "admin",
    isShopowner: false,
  },
  {
    firstName: "Shop",
    lastName: "Owner",
    nationality: "AU",
    email: "shop@owner.com",
    encryptedPassword: bcrypt.hashSync("Truc", 10),
    organization: "SSI",
    certNb: "1612JH1234",
    mainCert:"Master Scuba Diver",
    secCert: "Open Water Scuba Instructor",
    speciality: "Deep Diver",
    role: "shopowner",
    isShopowner: true,
  },
];


User.create(divers)
  .then(diverResult => {
    console.log(`${diverResult.length} new divers added`);
  })
  .catch(err => {
    console.log("Create failure!", err);
  });