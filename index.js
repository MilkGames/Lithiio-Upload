"use strict";
var request = require('request');
var events = require('events').EventEmitter;
var fs = require('fs');
exports.fetchAPIKey = function(email, password) {
  let Emitter = new events;
  let req = request.post('https://lithi.io/api/v1/fetch-api-key.php', function(error, response, body) {
    if (error) throw new Error(error);
    if (JSON.parse(body).apikey) {
      Emitter.emit('success', JSON.parse(body).apikey);
    } else {
      Emitter.emit('error', JSON.parse(body).error);
    }
  });
  let form = req.form();
  form.append('email', email);
  form.append('password', password);
  return Emitter;
};

exports.upload = function(apikey, data) {
  let Emitter = new events;
  let req = request.post('https://upload.lithi.io/v1.php', function(error, response, body) {
    if (error) throw new Error(error);
    if (JSON.parse(body).url) {
      Emitter.emit('success', JSON.parse(body).url);
    } else {
      Emitter.emit('error', JSON.parse(body).error);
    }
  }).on('drain', () => {
    Emitter.emit('progress', req.req.connection._bytesDispatched*100/req.headers['content-length']);  
  });
  let form = req.form();
  form.append('key', apikey);
  form.append('file', data);
  return Emitter;
};