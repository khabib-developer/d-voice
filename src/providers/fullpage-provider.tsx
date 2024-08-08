"use client";
import { stopScrolling } from "@/z_shared/utils";
import React, { useEffect, useRef } from "react";

const FullPageScroll = ({ children }: { children: React.ReactNode }) => {
  const scrolled = useRef(false);

  const wrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    stopScrolling();

    const handleScrollEnd = () => {
      setTimeout(() => {
        scrolled.current = false;
      }, 1000);
    };

    const handleScroll = (event: WheelEvent) => {
      if (scrolled.current) return;

      scrolled.current = true;

      const sections = Array.from(
        document.querySelectorAll<HTMLDivElement>(".section")
      );
      const scrollDirection = event.deltaY > 0 ? "down" : "up";
      // Get the current active section or default to the first section
      let currentSection =
        sections.find((section) => section.classList.contains("active")) ||
        sections[0];
      let nextSection: HTMLDivElement | null = null;
      // Determine the next section based on the scroll direction
      const currentIndex = sections.indexOf(currentSection);
      if (scrollDirection === "down" && currentIndex < sections.length - 1) {
        nextSection = sections[currentIndex + 1];
      } else if (scrollDirection === "up" && currentIndex > 0) {
        nextSection = sections[currentIndex - 1];
      }
      if (nextSection) {
        currentSection.classList.remove("active");
        nextSection.classList.add("active");
        window.scrollTo({
          top: nextSection.offsetTop,
          behavior: "smooth",
        });
      } else scrolled.current = false;
    };

    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);
  return <div ref={wrapper}>{children}</div>;
};

export default FullPageScroll;
