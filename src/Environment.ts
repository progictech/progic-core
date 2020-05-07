export class Environment {
  static data = {
    debug: false,
    STORAGE: {
      TEMP_FOLDER: "/temp"
    }
  };
  static setEnv (data: any) {
    this.data = data;
  }
}
