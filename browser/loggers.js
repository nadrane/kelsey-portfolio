import { postJSON } from "./http";
export function logError(err) {
  console.error(err);
  return postJSON({
    url: '/errors',
    body: JSON.stringify(err)
  })
  .catch(console.error.bind(console));
}
