import { getMetadataArgsStorage } from "routing-controllers";
import { StringUtils } from "../util/StringUtils";

export function ProgicController (baseRoute?: string) {
  return function (object: Function) {
    getMetadataArgsStorage().controllers.push({
      type: "json",
      target: object,
      route: baseRoute
        ? baseRoute
        : "/" + StringUtils.toKebabCase(object.name.replace("Controller", ""))
    });
  };
}

export function IndexPost (route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: "post",
      target: object.constructor,
      method: methodName,
      route: route ? route : "/index"
    });
  };
}

export function DetailGet (route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: "get",
      target: object.constructor,
      method: methodName,
      route: route ? route : "/detail"
    });
  };
}

export function CreatePut (route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: "put",
      target: object.constructor,
      method: methodName,
      route: route ? route : "/create"
    });
  };
}

export function UpdatePatch (route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: "patch",
      target: object.constructor,
      method: methodName,
      route: route ? route : "/update"
    });
  };
}

export function DeleteMethod (route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: "delete",
      target: object.constructor,
      method: methodName,
      route: route ? route : "/delete"
    });
  };
}
