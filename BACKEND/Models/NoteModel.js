const mongoose =require("mongoose");


const noteSchema =new mongoose.Schema({
    title: {
        type: String,
        required: [true,"Title is required"],       
    },
    description: {
        type: String,
        required: [true,"Description is required"],  
    },
    userid: {
        type: String,
        required: [true,"userid is required"],      
    },
    date: {
        type: Date,
        default: Date.now(),
    }
    
});


module.exports = mongoose.model("Note",noteSchema);