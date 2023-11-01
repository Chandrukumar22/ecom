const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: Number,
            required: true,
            unique: true,
        },
        orderStatus: {
            type: String,
            required: true,
            enum:['booked','inprogress','complete']
        },
        orderDate: {
            type: Date,
            default:Date.now
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
module.exports = mongoose.model('Order', orderSchema)
