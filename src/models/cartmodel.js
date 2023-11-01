const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        cartId: {
            type: Number,
            required: true,
            unique: true,
        },
        address1: {
            type: String,
            required: true,
        },
        address2: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

//Export the model
module.exports = mongoose.model('Cart', cartSchema)
