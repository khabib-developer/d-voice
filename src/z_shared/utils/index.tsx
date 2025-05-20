"use client";

export const stopScrolling = (stop = true) => {
  if (typeof window === "undefined") return;
  if (stop) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
};

export const navigateToProfileDvoice = () => {
  window.open(process.env.NEXT_PUBLIC_PROFILE_DVOICE!);
};
