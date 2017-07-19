import queryString from "query-string";
import bluebird from "bluebird";

const fetchJSON = url => {
  const headers = new Headers({ Accept: "application/json" });
  return bluebird.resolve(
    fetch(url, {
      headers: headers,
      credentials: 'same-origin', // send cookies
    })
  ).then(parseResponse);
};

const postJSON = (url, body) => {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  return bluebird.resolve(
    fetch(url, {
      headers,
      method: "POST",
      credentials: 'same-origin', // send cookies
      body: JSON.stringify(body)
    })
  ).then(parseResponse);
};

const parseResponse = function(response) {
  var contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response;
  }
};

function definePaginationQuery(url, limit = 15, offset = 0) {
  return function() {
    const response = fetchJSON(
      url +
        "?" +
        queryString.stringify({
          limit,
          offset
        })
    );
    offset += limit;
    return response;
  };
}

const fetchImages = definePaginationQuery("/api/images/");

export { fetchImages, postJSON, fetchJSON };
