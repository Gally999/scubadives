const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type:String,
        required: true,
        minlength: 2,
    },
    lastName: {
        type:String,
        required: true,
        minlength: 2,
    },
    nationality: {
        type:String,
        required: true,
        minlength: 2,
    },
    email: {
        type:String,
        required:true,
        unique: true,
        match: /^.+@.+\..+$/,
    },
    encryptedPassword: {
        type:String,
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
        default: "Scuba Diver",
    },
    secCert:{
        type: String,
        enum:["None", "Dive Master", "Open Water Scuba Instructor"],
        default: "None",
    },
    speciality:{
        type: String,
        enum:["None", "Altitude Diver", "Boat Diver", "Fish Identification", "Drift Diver", "Peak Performance Buoyancy", "Night Diver", "Wreck Diver", "Dry Suit Diver", "Advanced Rebreather Diver", "Deep Diver", "Cave Diver", "Search and Recovery Diver", "Emergency First Response Provider"],
        default: "None",
    },
    role:{
        type: String,
        enum: ["diver", "shopowner", "admin"],
        required: true,
        default: "diver",
    },
    isShopowner:{
        type: Boolean,
    }
},{
    timestamps:true,
});

//booleans for Admin users
// use the regular annoymous function rather than the arrow annoymous function
// userSchema.virtual('isShopowner').get(function () {
//     return this.role === 'shopowner';
// });

// userSchema.virtual('isAdmin').get(function () {
//     return this.role === 'admin';
// });

const User = mongoose.model("User", userSchema);
module.exports = User;