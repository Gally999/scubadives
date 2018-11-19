const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name: {
        type:String,
        required: true,
        minlength: 2,
    },
    country:{
        type: String,
        required: true,
        minlength: 2,
    },
    shopNb: {
        type:String,
        required: true,
        minlength: 2,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    organization:{
        type: String,
        enum:["PADI", "SSI", "SDI"],
        required: true,
    },
    certNb:{
        type: String,
        required: true,
        unique: true,
    },
    mainCert:{
        type: String,
        enum:["Scuba Diver", "Open Water", "Adventure Diver", "Advanced Open Water", "Rescue Diver", "Master Scuba Diver"],
        required: true,
    },
    secCert:{
        type: String,
        enum:["Dive Master", "Open Water Scuba Instructor",]
    },
    speciality:{
        type: String,
        enum:["Altitude Diver", "Boat Diver", "Fish Identification", "Drift Diver", "Peak Performance Buoyancy", "Night Diver", "Wreck Diver", "Dry Suit Diver", "Advanced Rebreather Diver", "Deep Diver", "Cave Diver, Search and Recovery Diver", "Emergency First Response Provider"],
    },
    ratings:{
        type: Number,
        min: 1,
        max: 5,
    },
    divesites:{
        type: Schema.Types.ObjectId,
        ref: "Divesite",
        required:true,
    },
  // Embedded Documents  
  reviews: [{
    user: {
      type:Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    comments: {
      type:String,
      required:true,
      maxlength: 200,
    },
  }] ,
},{
    timestamps:true,
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;