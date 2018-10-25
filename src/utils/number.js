export const toCropped = (val, real = 2) => {
  if (!val) return val;
  let idx = String(val).indexOf('.');
  if (idx === -1) return val;

  val = Number(val);
  if (Number.isNaN(val)) {
    throw new Error('不是合法数字');
  }

  return String(val).slice(0, idx + real + 1);
}