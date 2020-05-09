import { System } from "../util/System";
import { Environment } from "../Environment";

export class LogService {
  static async info (input: string) {
    if (Environment.data?.debug !== true) {
      return;
    }
    console.log(System.getTime().toISOString() + " - " + input);
  }
}
