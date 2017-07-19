import { postJSON } from "./http";
export function logError(err) {
  console.error(err);
  return postJSON("/services/error", err)
  .catch(console.error.bind(console));
}
