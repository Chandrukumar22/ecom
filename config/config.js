require('dotenv').config();
const CONFIG = {};

CONFIG.MONGODB_URL = "mongodb://127.0.0.1:27017/product"
CONFIG.JWT_SECREATE_KEY = "MYUSER"

module.exports = CONFIG;
