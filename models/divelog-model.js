const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const moment = require("moment");

const divelogSchema = new Schema({
  diveNb: {
      type:Number,
      required: true,
  },
  divesite: { 
    type: Schema.Types.ObjectId, 
    ref: "Divesite",
    required: true, 
  },
  date: { 
    type: Date, 
    required: true 
  },
  depthInfo: { type: String, enum: ["m", "ft"] }, 
  depth: { type: Number }, 
  weightNb: { type: Number },
  weightInfo: { 
    type: String, 
    enum: ["kg", "lbs"] 
  },
  suitThickness: { type: String },
  airInfo: { 
    type: String, 
    enum: ["bars", "psi"] 
  },
  airInNb: { type: Number }, 
  airOut: { type: Number },
  diveTime: { type: Number },
  entryTime: { type: String },
  exitTime: { type: String },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  // buddy: {
  //   type: Schema.Types.ObjectId, 
  //   ref: "User", 
  // }, 
  // guide: { 
  //   type: Schema.Types.ObjectId, 
  //   ref: "User", 
  // },
  // shop: { 
  //   type: Schema.Types.ObjectId, 
  //   ref: "Shop"  
  // },
  seen: { type: String },
  comments: { type: String },
  rating: { 
    type: Number, 
    min: 1,
    max: 5, 
  }, 
  divesiteReviews: {
      type:String,
      maxlength: 200,
    },
},{
  timestamps:true,
});



// used npm package "moment" to format the date to a more readable format // don't use arrow funtion (binding necessary)
divelogSchema.virtual("shortDate").get(function() {
  return moment(this.date).format("YYYY/MM/DD");
})


const Divelog = mongoose.model("Divelog", divelogSchema);
module.exports = Divelog;