const mongoose=require("mongoose");
const Schema = mongoose.Schema;


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
  buddy: {
    type: Schema.Types.ObjectId, 
    ref: "User", 
  }, 
  guide: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
  },
  shop: { 
    type: Schema.Types.ObjectId, 
    ref: "Shop"  
  },
  seen: { type: [String] },
  comments: { type: [String] },
  rating: { 
    type: Number, 
    min: 1,
    max: 5, 
  }, 
  divesiteReviews: {
      type:String,
      required:true,
      maxlength: 200,
    },
},{
  timestamps:true,
});


const Divelog = mongoose.model("Divelog", divelogSchema);
module.exports = Divelog;