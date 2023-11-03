const { to } = require('await-to-js')

module.exports.to = async (promise) => {
    let err, res
    ;[err, res] = await to(promise)
    if (err) return [err, null]
    return [null, res]
}

module.exports.ReE = function (res, err, code) {
    // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message
    }

    if (typeof code !== 'undefined') res.statusCode = code

    return res.json({ success: false, error: err })
}

module.exports.ReS = function (res, data, code) {
    // Success Web Response
    let send_data = { success: true }

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data) //merge the objects
    }

    if (typeof code !== 'undefined') res.statusCode = code
    else {
        res.statusCode = 400
    }

    return res.json(send_data)
}

function isNull(field) {
  return typeof field === "undefined" || field === "" || field === null || field === "null"
}

module.exports.isNull = isNull;

  const undefined = (field) => {
    return (
      typeof field === "undefined" ||
      field === undefined ||
      field === ""
    );
  }
  module.exports.undefined = undefined;

  
  function isEmpty(obj) {
    return !Object.keys(obj).length > 0;
  }
  
  module.exports.isEmpty = isEmpty;
  