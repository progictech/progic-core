import { System } from "../util/System";

export class ValidatorService {
  static isAlphaUnderscore (input: string) {
    return /[a-z_]/g.test(input);
  }

  static isValidDateString (input) {
    if (!this.hasValue(input)) {
      return false;
    }
    return System.getTime(input).isValid();
  }

  static isPhoneNumber (input) {
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(input);
  }

  static isPersonName (input) {
    if (!this.hasValue(input)) {
      return false;
    }
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(input);
  }

  static isNumber (input) {
    if (!this.hasValue(input)) {
      return false;
    }
    if (isNaN(input)) {
      return false;
    }
    return true;
  }

  static isPositiveNumber (input, includeZero = true) {
    if (!this.isNumber(input)) {
      return false;
    }
    if (includeZero) {
      return input >= 0;
    } else {
      return input > 0;
    }
  }

  static isNegativeNumber (input, includeZero = true) {
    if (!this.isNumber(input)) {
      return false;
    }
    if (includeZero) {
      return input <= 0;
    } else {
      return input < 0;
    }
  }

  static isBetweenEqual (inputValue, firstValue, secondValue) {
    if (!inputValue) {
      return false;
    }
    return inputValue >= firstValue && inputValue <= secondValue;
  }

  static isBetween (value, firstValue, secondValue) {
    return value > firstValue && value < secondValue;
  }

  static isLatitude (latitude: number) {
    return !!this.isBetweenEqual(latitude, -90, 90);
  }

  static isLongitude (longitude: number) {
    return !!this.isBetweenEqual(longitude, -180, 180);
  }

  static isGeoPos (latitude: number, longitude: number) {
    return this.isLatitude(latitude) && this.isLongitude(longitude);
  }

  static checkForReqValue (body: any, keys: any[]) {
    const missingKeys = [];
    for (const key of keys) {
      if (typeof key === "string") {
        if (!this.hasValue(body[key])) {
          missingKeys.push(key);
        }
      } else {
        for (const child of body[key.key]) {
          if (!this.checkForReqValue(child, key.innerKeys)) {
            missingKeys.push(key.key);
          }
        }
      }
    }
    return missingKeys;
  }

  static hasValue (input) {
    if (!input) {
      return false;
    }
    if (typeof input === "string") {
      if (input.length <= 0) {
        return false;
      }
    }
    if (typeof input === "object") {
      if (Object.keys(input).length <= 0) {
        return false;
      }
    }
    return true;
  }

  static isOdd (input: number) {
    return input & 1;
  }

  static isEven (input: number) {
    return !(input & 1);
  }

  static isPlateNumber (plateNumber: string) {
    const regex = new RegExp(
      "/^([A-Z]{1,3})(\\s|-)*([1-9][0-9]{0,3})(\\s|-)*([A-Z]{0,3}|[1-9][0-9]{1,2})$/i"
    );
    return regex.test(plateNumber);
  }

  static id (input) {
    const regex = new RegExp(/^[a-f\d]{24}$/i);
    return regex.test(input);
  }

  static allHasValues (values: any[]) {
    let returnValue = true;
    if (values) {
      for (const value of values) {
        if (!value) {
          returnValue = false;
          break;
        }
      }
    }
    return returnValue;
  }
}
