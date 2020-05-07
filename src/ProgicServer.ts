import {
  RoutingControllersOptions,
  createExpressServer
} from "routing-controllers";
import { Environment } from "./Environment";
import { HelmetMiddleware } from "./middleware/HelmetMiddleware";
import { ClientChecker } from "./middleware/ClientChecker";
import { InjectAuthToken } from "./middleware/InjectAuthToken";
import { ErrorHandler } from "./middleware/ErrorHandler";
import path = require("path");

export class ProgicServer {
  static routingOptions = {};
  static app = null;
  static routingDefaultOptions = {
    cors: true,
    classTransformer: true,
    middlewares: [
      HelmetMiddleware,
      ClientChecker,
      InjectAuthToken,
      ErrorHandler
    ],
    defaultErrorHandler: false,
    controllers: [path.join(__dirname, "controller", "*.js")]
  };
  static init (
    routingOptions: RoutingControllersOptions = null,
    clientEnv: any = null
  ) {
    if (clientEnv) {
      Environment.setEnv(clientEnv);
    }
    this.routingOptions = routingOptions ?? this.routingDefaultOptions;
    this.app = createExpressServer(this.routingOptions);
    return this.app;
  }
}

export * from "./decorator/CrudDecorators";
export * from "./middleware/ClientChecker";
export * from "./middleware/ErrorHandler";
export * from "./middleware/HelmetMiddleware";
export * from "./middleware/InjectAuthToken";
export * from "./service/LogService";
export * from "./service/ValidatorService";
export * from "./util/Common";
export * from "./util/Comparator";
export * from "./util/FormatUtil";
export * from "./util/StringUtils";
export * from "./util/System";
export * from "./service/FirebaseStorage";
