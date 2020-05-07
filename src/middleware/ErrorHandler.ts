import {
  ExpressErrorMiddlewareInterface,
  Middleware,
  UnauthorizedError
} from "routing-controllers";
import { error } from "../util/FormatUtil";
import { Constant } from "../constant/Constant";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error (err: any, req: any, res: any, next: (err?: any) => any) {
    if ([UnauthorizedError].indexOf(err.constructor) === -1) {
      console.error(err);
    }
    if (err.constructor === UnauthorizedError) {
      return res
        .status(Constant.HTTP_CODE.INVALID_CREDENTIAL)
        .json(error(err.message, Constant.HTTP_CODE.INVALID_CREDENTIAL));
    }
    if (err.constructor === SyntaxError)
      return res
        .status(Constant.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json(error("Wrong json!"));
    return res
      .status(Constant.HTTP_CODE.INTERNAL_SERVER_ERROR)
      .json(error("System error!"));
  }
}
