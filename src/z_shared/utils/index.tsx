export const stopScrolling = (stop = true) => {
  if (typeof window === "undefined") return;
  if (stop) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
};
