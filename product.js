

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, required: true }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;