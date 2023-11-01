const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        productId: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        quentity: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
            enum: ['Apple', 'Samsung', 'Vivo'],
        },
        color: {
            type: String,
            enum: ['Black', 'Brown', 'Red'],
        },
        ratings: {
            star: Number,
        },
        active: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updateAt: {
            type: Date,
            default: Date.now,
        },
        
    },
    { timestamps: true }
)

//Export the model
module.exports = mongoose.model('Product', productSchema)
