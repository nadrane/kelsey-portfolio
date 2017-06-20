import queryString from "query-string";
import Promise from 'bluebird';

const fetchJSON = url => {
  return Promise.resolve(fetch(url))
    .then(response => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve JSON from server");
      }
    })
};

function definePaginationQuery(url, limit=15, offset=0) {
  return function () {
    const response = fetchJSON(url + '?' + queryString.stringify({
      limit,
      offset
    }));
    offset += limit;
    return response;
  }
}

const fetchImages = definePaginationQuery('/api/images/');

export { fetchImages };