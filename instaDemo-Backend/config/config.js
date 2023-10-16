const mongoose = require('mongoose');


const connectDb = (database_Url) => {
    try {

        // mongoose.connect("mongodb://localhost:27017/Social_demo");
        mongoose.connect(database_Url);
        console.log("mdb connected")
    } catch (err) {
        console.log("dbconnection err", err);
    }

}

module.exports = connectDb;
