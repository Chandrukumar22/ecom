const mongoose = require('mongoose') // Erase if already required
const bcrypt = require('bcrypt')
const token = require('../../jwt.token')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required:true
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'sub-admin'],
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
        },
       
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Cart'
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    },
    {
        timestamps: true,
    }
)
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.tokenGenerate = async function(findUser){
      return ({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: token.generateToken(findUser?._id),
        active: findUser?.active,
      })
  };

//Export the model
module.exports = mongoose.model('Userdetails', userSchema)
