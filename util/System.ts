import moment = require("moment");

export class System {
  static getTime (input?) {
    let timeMoment = null;
    if (input) {
      timeMoment = moment(input);
    } else {
      timeMoment = moment();
    }
    return timeMoment.utcOffset("+0700");
  }

  static getEndDayTime (input?) {
    return System.getTime(input).endOf("day");
  }

  static getStartDayTime (input?) {
    return System.getTime(input).startOf("day");
  }

  static getTomorrowTime (input?) {
    return System.getTime(input).add(1, "day");
  }

  static async sleep (ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}
