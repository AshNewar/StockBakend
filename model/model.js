import mongoose from "mongoose";

const Schema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    }
})

const Stock = mongoose.model('Stock', Schema);
export default Stock;