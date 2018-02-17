export const getJSON = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      callback(JSON.parse(this.response));
    } else {
      // We reached our target server, but it returned an error
      console.error(this.statusText);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.error(this.statusText);
  };

  request.send();
};
