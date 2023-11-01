const mongoose = require('mongoose');
const dotenv = require("dotenv").config({path:"./config/.env"});
const User = require("../../src/controller/user/usercntrl");
describe('insert', () => {   
  let db;
  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true });

    const db = mongoose.connection;
  });

  afterAll(async () => {
    await mongoose.connection.close()
  });
  
  test('should  be insert the values',async ()=>{
    const result = await User.getAllUser({active:true})
    expect(result).toBe();
  })
});