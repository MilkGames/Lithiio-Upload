"use strict";
var request = require('request');
exports.fetchAPIKey = function(email, password) {
  return new Promise((resolve, reject) => {
    var req = request.post('https://lithi.io/api/v1/fetch-api-key.php', function(error, response, body) {
      if (error) throw new Error(error);
      if (JSON.parse(body).apikey) {
        resolve(JSON.parse(body).apikey);
      } else {
        reject(JSON.parse(body).error);
      }
    });
    var form = req.form();
    form.append('email', email);
    form.append('password', password);
  })
}
exports.upload = function(apikey, data) {
  return new Promise((resolve, reject) => {
    var req = request.post('https://upload.lithi.io/v1.php', function(error, response, body) {
      if (error) throw new Error(error);
      if (JSON.parse(body).url) {
      	resolve(JSON.parse(body).url);
      } else {
      	reject(JSON.parse(body).error);
      }
    })
    var form = req.form();
    form.append('key', apikey);
    form.append('file', data);
  })
}