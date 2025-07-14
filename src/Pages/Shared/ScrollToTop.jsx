import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use a slight delay to ensure the DOM is updated before scrolling
    const scrollSmoothly = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Delay execution just enough to allow transition/rendering to complete
    const timeout = setTimeout(scrollSmoothly, 10); // Optional: adjust delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
