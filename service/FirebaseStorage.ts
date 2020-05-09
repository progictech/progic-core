import MulterCloudFunction = require("@sudtanj/multer");
import { getRandomFileName, notifyError } from "../util/Common";
import * as admin from "firebase-admin";
import { Environment } from "../Environment";
import { System } from "../util/System";

export class FirebaseStorage {
  static async upload (req: any, ext: string) {
    if (!req.files) {
      return notifyError("Files payload not found!");
    }
    const result = [];
    const bufferArray = [];
    const bucket = admin.storage().bucket();
    for (const file of req.files) {
      const newFileName = getRandomFileName("", ext);
      result.push(newFileName);
      bufferArray.push(file.buffer);
    }
    for (let i = 0; i < result.length && i < bufferArray.length; i++) {
      const bucketFile = bucket.file(
        Environment.data.STORAGE.TEMP_FOLDER + result[i]
      );
      await bucketFile.save(bufferArray[i]);
    }
    return result;
  }

  static getMulterFunctionMiddleware () {
    return MulterCloudFunction({
      storage: MulterCloudFunction.memoryStorage(),
      limits: { fieldSize: 100000 },
      startProcessing (req, busboy) {
        req.rawBody ? busboy.end(req.rawBody) : req.pipe(busboy);
      }
    }).any();
  }

  static async getStoragePublicUrl (fileName: string) {
    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);
    if (!(await this.isStorageFileExist(file))) {
      return null;
    }
    const result = await file.getSignedUrl({
      action: "read",
      expires: System.getTomorrowTime().toISOString()
    });
    return result[0];
  }

  static async isStorageFileExist (file) {
    const fileExist = await file.exists();
    if (!fileExist[0]) {
      return false;
    }
    return true;
  }
}
