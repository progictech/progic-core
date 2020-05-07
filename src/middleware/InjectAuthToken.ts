import {
  ExpressMiddlewareInterface,
  Middleware,
  UnauthorizedError
} from "routing-controllers";
import { getAuthToken, waitForPromise } from "../util/Common";
import { Wording } from "../constant/Wording";
import { Env } from "../constant/Environment";
import { Constant } from "../constant/Constant";
import { FirebaseService } from "../service/FirebaseService";

@Middleware({ type: "before" })
export class InjectAuthToken implements ExpressMiddlewareInterface {
  async use (req: any, resp: any, next: (err?: any) => any) {
    req.auth = await getAuthToken(req);
    const route = req.path;
    if (route.indexOf("/api-docs") > -1) {
      return next();
    }
    if (!req.auth) {
      throw new UnauthorizedError(Wording.AUTHORIZATION_IS_REQUIRED);
    }
    if (Env.ROLE_CHECKER_EXCLUDE_URL.indexOf(route) === -1) {
      if (req.user && !req.user.role) {
        waitForPromise(FirebaseService.syncJwt(req.user.uid));
        throw new UnauthorizedError(
          "Something wrong with your authorization, please sign in again! "
        );
      }
      if (req.user?.role !== Constant.ROLE.DRIVER) {
        throw new UnauthorizedError("Only driver allowed to access this!");
      }
    }
    return next();
  }
}
