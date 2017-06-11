const fetchJSON = url => {
  return fetch(url)
    .then(response => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        return Promise.reject(new Error("Failed to retrieve JSON from server"));
      }
    })
};

export { fetchJSON };