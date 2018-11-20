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

// const divers = [
//   {
//     firstName: "Dave",
//     lastName: "Grohl",
//     nationality: "US",
//     email: "dave@grohl.com",
//     encryptedPassword: bcrypt.hashSync("Truc1", 10),
//     organization: "PADI",
//     certNb: "1403AH7879",
//     mainCert:"Advanced Open Water",
//     speciality: ["Cave Diver"],
//     role: "diver",
//     isShopowner: false,
//   },
//   {
//     firstName: "Bear",
//     lastName: "Grylls",
//     nationality: "UK",
//     email: "bear@grylls.com",
//     encryptedPassword: bcrypt.hashSync("Truc2", 10),
//     organization: "SSI",
//     certNb: "1001AY8819",
//     mainCert:"Master Scuba Diver",
//     speciality: ["Ice Diver", "Night Diver", "Wreck Diver"],
//     role: "diver",
//     isShopowner: false,
//   },
//   {
//     firstName: "Winny",
//     lastName: "the Bear",
//     nationality: "CA",
//     email: "winny@blueforest.com",
//     encryptedPassword: bcrypt.hashSync("Truc3", 10),
//     organization: "PADI",
//     certNb: "0909WY0909",
//     mainCert:"Scuba Diver",
//     speciality: "Drift Diver",
//     role: "diver",
//     isShopowner: false,
//   },
//   {
//     firstName: "Water",
//     lastName: "Bottle",
//     nationality: "NZ",
//     email: "water@bottle.com",
//     encryptedPassword: bcrypt.hashSync("Truc4", 10),
//     organization: "SDI",
//     certNb: "0808WB0060",
//     mainCert:"Adventure Diver",
//     role: "diver",
//     isShopowner: false,
//   },
//   {
//     firstName: "Super",
//     lastName: "User",
//     nationality: "BR",
//     email: "super@user.com",
//     encryptedPassword: bcrypt.hashSync("Truc5", 10),
//     organization: "PADI",
//     certNb: "1901HT9834",
//     mainCert:"Rescue Diver",
//     secCert: "Open Water Scuba Instructor" ,
//     speciality: ["Altitude Diver", "Boat Diver", "Fish Identification", "Drift Diver", "Peak Performance Buoyancy", "Night Diver", "Wreck Diver", "Dry Suit Diver", "Advanced Rebreather Diver", "Deep Diver", "Cave Diver", "Search and Recovery Diver", "Emergency First Response Provider"],
//     role: "admin",
//     isShopowner: false,
//   },
//   {
//     firstName: "Shop",
//     lastName: "Owner",
//     nationality: "AU",
//     email: "shop@owner.com",
//     encryptedPassword: bcrypt.hashSync("Truc6", 10),
//     organization: "SSI",
//     certNb: "1612JH1234",
//     mainCert:"Master Scuba Diver",
//     secCert: "Open Water Scuba Instructor",
//     speciality: "Deep Diver",
//     role: "shopowner",
//     isShopowner: true,
//   },
// ];


// User.create(divers)
//   .then(diverResult => {
//     console.log(`${diverResult.length} new divers added`);
//   })
//   .catch(err => {
//     console.log("Create failure!", err);
//   });


// Creation of dive sites

const divesites = [
  {
    name: "USAT Liberty",
    city: "Tulamben",
    country: "ID", 
    rating: 5, 
    reviews: [{
      user: "5bf2d3ae3682de154cb99565",
      comments: "C'était supair !",
  }]
  }, 
  {
    name: "Blue Hole",
    city: "Belize City",
    country: "BZ", 
    rating: 5, 
    reviews: [{
      user: "5bf2d3ae3682de154cb99565",
      comments: "Amazingly blue!",
  }]
  },
  {
    name: "Playa Blanca",
    city: "Playa Blanca",
    country: "ES", 
    rating: 3, 
    reviews: [{
      user: "5bf2d3f0c46dad49502e9afc",
      comments: "We can see angel sharks!",
    }]
  },
  {
    name: "Secca di Capistello",
    city: "Lipari",
    country: "IT", 
    rating: 2, 
    reviews: [{
      user: "5bf2d3f0c46dad49502e9afc",
      comments: "Nice wall!",
  }]
  },
]




// Creation of divelogs

const divelogs = [
  {
    diveNb: 1,
    divesite: "USAT Liberty",
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
    user: "5bf2d3ae3682de154cb99565",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    seen:  ["Turtles"] ,
    comments: ["C'était supair !"],
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, 
  {
    diveNb: 2,
    divesite: "SS Liberty",
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
    user: "5bf2d3ae3682de154cb99565",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    shop: ,
    seen:  ["Turtles"] ,
    comments: ["C'était supair !"],
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, 
  {
    diveNb: 1,
    divesite: "Playa Blanca",
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
    user: "5bf2d3f0c46dad49502e9afc",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    shop: ,
    seen:  ["Turtles"] ,
    comments: ["We can see angel sharks!"],
    rating: 5,
    divesiteReviews: "We can see angel sharks!",
  }, 
  {
    diveNb: 2,
    divesite: "SS Liberty",
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
    user: "5bf2d3ae3682de154cb99565",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    shop: ,
    seen:  ["Turtles"] ,
    comments: ["C'était supair !"],
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, 
  {
    diveNb: 1,
    divesite: "SS Liberty",
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
    user: "5bf2d3ae3682de154cb99565",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    shop: ,
    seen:  ["Turtles"] ,
    comments: ["C'était supair !"],
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, 
  {
    diveNb: 2,
    divesite: "SS Liberty",
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
    user: "5bf2d3ae3682de154cb99565",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    shop: ,
    seen:  ["Turtles"] ,
    comments: ["C'était supair !"],
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, 
  {
    diveNb: 1,
    divesite: "SS Liberty",
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
    user: "5bf2d3ae3682de154cb99565",
    buddy: "5bf2d3ae3682de154cb99564", 
    guide: "5bf2d3ae3682de154cb99567",
    shop: ,
    seen:  ["Turtles"] ,
    comments: ["C'était supair !"],
    rating: 5,
    divesiteReviews: "Très beau site, il faut y aller",
  }, 
]

Divelogs.create(divelogs)
  .then(divelogsResult => {
    console.log(`${divelogsResult.length} new divelogs added`);
  })
  .catch(err => {
    console.log("Create failure!", err);
  });