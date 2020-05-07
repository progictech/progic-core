import uuidv4 = require("uuid/v4");

export function isArrayEmpty (array: any[]) {
  return safeLength(array) === 0;
}

export function safeLength (array: any[]) {
  if (!array) return 0;
  return array.length;
}

export function waitForPromise<T> (promise: Promise<T> | Promise<T>[]) {
  if (Array.isArray(promise)) {
    Promise.all(promise)
      .then(value => {
        return value;
      })
      .catch(value => {
        return value;
      });
  } else {
    promise
      .then(value => {
        return value;
      })
      .catch(value => {
        return value;
      });
  }
}

export function safeObjectCheck (object, keys: string[]) {
  if (!object) {
    return false;
  }
  for (const key of keys) {
    if (!object[key]) {
      return false;
    }
  }
  return true;
}

export function safePush (array, key, input) {
  if (!Array.isArray(array[key])) {
    array[key] = [];
  }
  array[key].push(input);
  return array;
}

export function getRandomFileName (
  additionalBefore: string = "",
  additionalAfter: string = ""
) {
  return additionalBefore + uuidv4() + additionalAfter;
}

export function notifyError (errorMsg: string) {
  return new Error(errorMsg);
}

export function deepClone (input) {
  return JSON.parse(JSON.stringify(input));
}

export function initObject (keys: string[], defaultValue, object = {}) {
  for (const key of keys) {
    object[key] = deepClone(defaultValue);
  }
  return object;
}
