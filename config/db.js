//console.log("db.js loaded");

const mongoose = require("mongoose")

const connectDB = async () => {

     // console.log("Connecting to DB...");
     // console.log(process.env.MONGO_URI);

    try {
      const conn =  await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

     console.log(
      `Database Name: ${conn.connection.name}`
    );

        console.log("MongoDB connect Successfully!");
    } catch (error) {
        console.log("Database Connection Failed");
        console.error(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;