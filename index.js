
const product = require('./models/productmodule');
const order= require('./models/ordermodel');
const Cart = require('./models/cartmodel');
const User = require('./models/userModel');
const db = require('./db');


async function performFourTableJoin() {
  try {
    const results = await User.find({}).populate({ path: 'userId', strictPopulate: false,populate: { path: 'cartId', populate: {
            path: 'orderId',
            model: 'user'
          }
        }
      })
      .exec();

    console.log("values",results);
  } catch (err) {
    console.error(err);
  } 
}

async function performFourTableJoins() {
    try {
      const results = await User.find({}).populate({ path: 'orderId', strictPopulate: false,populate: { path: 'cartId', populate: {
              path: 'userId',
              model: 'User'
            }
          }
        })
        .exec();
  
      console.log("values1",results);
    } catch (err) {
      console.error(err);
    } 
  }

// performFourTableJoin();
performFourTableJoins();
module.exports ={ performFourTableJoin,performFourTableJoins}
