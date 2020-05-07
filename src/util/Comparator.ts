export class Comparator {
  static isEqualEitherTo (source, target: any[]) {
    for (const value of target) {
      if (value === source) {
        return true;
      }
    }
    return false;
  }
}
