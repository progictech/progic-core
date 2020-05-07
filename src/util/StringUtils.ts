export class StringUtils {
  static toKebabCase (str: string) {
    const result = str.replace(
      /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
      match => "-" + match.toLowerCase()
    );
    return str[0] === str[0].toUpperCase() ? result.substring(1) : result;
  }

  static parse (str, ...args) {
    let i = 0;

    return str.replace(/%s/g, () => args[i++]);
  }
}
