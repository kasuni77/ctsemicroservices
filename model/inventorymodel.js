//Use mongoose dependency
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Define a new database schema for Inventory
const Inventoryschema = new schema({
    itemName :{
        type : String,
        required: true
    },
    price : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    count : {
        type : String,
        required : true
    }
})

// create mongoose model
const Inventory = mongoose.model("inventory",Inventoryschema);


//Export the Inventory schema so that it can be accessed by other files
module.exports = Inventory;