const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Shop = require("../models/shop-model");

mongoose
  .connect(
    "mongodb://localhost/scubadives",
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

const diveShop = [
  {
    name: "Stingray",
    country: "Indonesia",
    shopNb: "1234AB567",
    user: {
      firstName: "Shop",
      lastName: "Owner",
      nationality: "AU",
      email: "shop@owner.com",
      encryptedPassword: bcrypt.hashSync("Truc6", 10),
      organization: "SSI",
      certNb: "1612JH1234",
      mainCert: "Master Scuba Diver",
      secCert: "Open Water Scuba Instructor",
      speciality: "Deep Diver",
      role: "shopowner",
      isShopowner: true
    },
    organization: "PADI",
    mainCert: [
      "Scuba Diver",
      "Open Water",
      "Adventure Diver",
      "Advanced Open Water",
      "Rescue Diver",
      "Master Scuba Diver"
    ],
    secCert: ["Dive Master", "Open Water Scuba Instructor"],
    speciality: [
      "Altitude Diver",
      "Boat Diver",
      "Fish Identification",
      "Drift Diver",
      "Peak Performance Buoyancy",
      "Night Diver",
      "Wreck Diver",
      "Dry Suit Diver",
      "Advanced Rebreather Diver",
      "Deep Diver",
      "Cave Diver, Search and Recovery Diver",
      "Emergency First Response Provider"
    ],
    ratings: "4",
    divesites: [
      {
        name: "Ray Point",
        city: "Bali",
        country: "ID",
        rating: 5,
        reviews: [
          {
            user: "5bf2d3ae3682de154cb99565",
            comments: "Amazingly blue!"
          }
        ]
      }
    ],
    reviews: [
      {
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
        comments: "C'était supair !"
      },
      {
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
        comments: "Manta Rays"
      }
    ]
  }
];

Shop.create(diveShop)
  .then(diveshopResult => {
    console.log(`${diveshopResult.length} new diveshop added`);
  })
  .catch(err => {
    console.log("Create failure!", err);
  });
