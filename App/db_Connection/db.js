const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectdb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected Successfully");
    }catch(error){
        console.log("Database Connection is Failed !")
    }
};
module.exports = connectdb;