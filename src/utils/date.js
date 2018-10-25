export const getDateRange = (type) => {
  let dateStart, dateEnd;
  if (type === 'week') {
    let wd = new Date().getDay();
    if (wd === 0) {
      dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * 6).toLocaleDateString();
      dateEnd = new Date().toLocaleDateString();
    } else {
      dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * (wd - 1)).toLocaleDateString();
      dateEnd = new Date(new Date().getTime() + 3600 * 24 * 1000 * (7 - wd)).toLocaleDateString();
    }
  } else if (type === 'month') {
    let date = new Date();
    let md = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    dateStart = new Date(year, month - 1).toLocaleDateString();
    dateEnd = new Date(new Date(year, month).getTime() - 1).toLocaleDateString();
  } else if (type === 'l7') {
    // means latest 7 days
    dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * 6).toLocaleDateString();
    dateEnd = new Date().toLocaleDateString();
  } else if (type === 'l30') {
    // means latest 30 days
    dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * 29).toLocaleDateString();
    dateEnd = new Date().toLocaleDateString();
  }
  
  // return `${dateStart}~${dateEnd}`;
  return [dateStart, dateEnd];
}