export default (stamp) => {

  if (!stamp) return '';

  const date = new Date(stamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth() + 1;
  const dayNow = dateNow.getDate();

  if (year === yearNow && month === monthNow && day === dayNow) {
    return `${hour}:${minute > 9 ? minute : '0' + minute}`;
  }

  const time1 = new Date(yearNow, monthNow - 1, dayNow).getTime();
  const time2 = date.getTime();
  
  if (time1 - time2 <= 86400000) {
    return '昨天';
  }

  if (time1 - time2 <= 86400000 * 2) {
    return '前天';
  }

  if (time1 - time2 <= 86400000 * 3) {
    return '大前天';
  }

  return `${String(year).slice(2)}/${month}/${day}`;
}
