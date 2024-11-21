// This component fix the issue of middle View Page which Makes to Top view
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
