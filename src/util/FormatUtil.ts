import { deepClone } from "./Common";
import { System } from "./System";

export function success (data?: any) {
  const result = {
    status: "success",
    serverTime: System.getTime().toDate()
  };
  if (data) {
    result["data"] = deepClone(data);
  } else {
    result["data"] = {};
  }
  return result;
}

export function error (data?: any) {
  const result = {
    status: "error",
    serverTime: System.getTime().toDate()
  };
  if (data) {
    result["data"] = data;
  }
  return result;
}
