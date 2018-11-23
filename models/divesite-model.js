const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const divesiteSchema = new Schema({
  name: {
      type:String,
      required: true,
  },
  city: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true, 
    minlength: 2 
  }, 
  rating: { 
    type: Number, 
    min: 1,
    max: 5, 
  }, 
  reviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    rating: { type: Number },
    comments: {
      type:String,
      required:true,
      maxlength: 200,
    },
  }],
},{
  timestamps:true,
});


const Divesite = mongoose.model("Divesite", divesiteSchema);
module.exports = Divesite;