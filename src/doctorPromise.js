class DoctorList {
  getDoctorsByName(name,location){
    const Promise = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
  const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${location}&skip=0&limit=50&name=${name}&user_key=${process.env.exports.apiKey}`;
      console.log(url);
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  getDoctorsByQuery(location,query){
    const Promise = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${location}&skip=0&limit=50&query=${query}&user_key=${process.env.exports.apiKey}`;
      console.log(url);
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
export { DoctorList };
