const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/0605e1ac0d2c46d034710746f39ed094/${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find your location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.daily.data[0].summary} it is currently ${response.body.currently.temperature}. There is ${response.body.currently.precipProbability} chance to rain.`
      );
    }
  });
};

module.exports = forcast;
