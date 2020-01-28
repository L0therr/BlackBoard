var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String,
});

var productModel = mongoose.model('articles', productSchema);

module.exports = productModel;

console.log('====== articles export done ====')