const request = require('postman-request');
const fs = require('fs');

const getChannels = (date, callback) => {
  const url = `https://port.hu/tvapi?channel_id%5B%5D=tvchannel-5&channel_id%5B%5D=tvchannel-3&channel_id%5B%5D=tvchannel-21&channel_id%5B%5D=tvchannel-1&channel_id%5B%5D=tvchannel-2&date=${date}`;
  
  request({ url, json: true }, (error, response = {}) => {
    if (error) {
      callback('Error fetching port.hu data');
    }
    callback(undefined, response.body);
  })
}

module.exports = getChannels;