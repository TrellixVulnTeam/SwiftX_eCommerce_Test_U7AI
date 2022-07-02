import { useLocation } from "react-router";
import { useEffect } from "react";

const ScrollingToTop = () => {
  const routing = useLocation();
  function action() {
    window.scrollTo(0, 0);
  }
  useEffect(() => action(), [routing]);
  return null;
};
export default ScrollingToTop;