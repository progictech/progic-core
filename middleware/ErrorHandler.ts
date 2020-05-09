import {
  ExpressErrorMiddlewareInterface,
  Middleware,
  UnauthorizedError
} from "routing-controllers";
import { error } from "../util/FormatUtil";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error (err: any, req: any, res: any, next: (err?: any) => any) {
    if ([UnauthorizedError].indexOf(err.constructor) === -1) {
      console.error(err);
    }
    if (err.constructor === UnauthorizedError) {
      return res
        .json(error(err.message));
    }
    if (err.constructor === SyntaxError)
      return res
        .json(error("Wrong json!"));
    return res
      .json(error("System error!"));
  }
}
