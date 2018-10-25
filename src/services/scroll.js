// 滚动
export const scrollTo = (el, sTop = 0) => {
  const scrollTop = el.scrollTop;
  let offset = Math.abs(scrollTop - sTop);
  window.requestAnimationFrame(() => {
    // too fast
    // let nextScroll = Math.floor(offset - offset / (offset > 100 ? 6 : 3));
    let nextScroll = Math.floor(offset - offset / (offset > 100 ? 1.4 : 1.1));
    if (nextScroll >= 0 && nextScroll <= 1) {
      return el.scrollTop = sTop;
    };

    if (scrollTop - sTop > 0) {
      el.scrollTop = scrollTop - nextScroll;
    } else if (scrollTop - sTop < 0) {
      el.scrollTop = scrollTop + nextScroll;
    } else {
      return;
    }
    // console.log(scrollTop, sTop)
    scrollTo(el, sTop);
  });
}