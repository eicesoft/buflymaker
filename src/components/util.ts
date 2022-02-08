export function cloneDeep(...objs: any[]): any {
  const result = Object.create(null);
  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          // 递归
          if (isPlainObject(result[key])) {
            result[key] = cloneDeep(result[key], val);
          } else {
            result[key] = cloneDeep(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

let _uniqueId = 0;

export function uniqueId(prefix: string = '') {
  let randId = Date.now();
  _uniqueId++;
  return `${prefix}_${randId}_${_uniqueId}`;
}
