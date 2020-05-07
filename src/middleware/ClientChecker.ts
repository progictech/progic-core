import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Env } from "../constant/Environment";
import { Constant } from "../constant/Constant";
import { error } from "../util/FormatUtil";
import { LogService } from "../service/LogService";
import { waitForPromise } from "../util/Common";

@Middleware({ type: "before" })
export class ClientChecker implements ExpressMiddlewareInterface {
  use (request: any, resp: any, next: (err?: any) => any): any {
    const clientVersion = request.get("Client-Version");
    const route = request.path;
    if (
      Env.CLIENT_VERSION.indexOf(clientVersion) === -1 &&
      route.indexOf(Env.VERSION_CHECKER_EXCLUDE_URL) === -1
    ) {
      return resp
        .status(Constant.HTTP_CODE.SERVICE_UNAVAILABLE)
        .json(error("Update is required to continue using this services!"));
    }
    waitForPromise(
      LogService.info("A client access api with the following information :")
    );
    const info = {
      route,
      clientVersion,
      clientIp:
        request.headers["x-forwarded-for"] ||
        request.connection.remoteAddress ||
        "Unknown Ip Address"
    };
    waitForPromise(LogService.info(JSON.stringify(info)));
    next();
  }
}
