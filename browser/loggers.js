import { postJSON } from "./http";
import { isDev } from "../env/"

export function logError(err) {
  if (isDev()) {
    console.error(err);
  }
  return postJSON("/services/error", err)
}
