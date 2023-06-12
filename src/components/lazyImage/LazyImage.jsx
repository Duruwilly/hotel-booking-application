import React, { useEffect, useRef, useState } from "react";

const LazyImage = (props) => {
  const [imgvisibile, setImgVisible] = useState(false);
  const ref = useRef();

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
        console.log(entry.isIntersecting);
      if (entry.isIntersecting) {
        setImgVisible(true);
      }
    });
  };
console.log("imgvisibile", imgvisibile);
  useEffect(() => {
    let observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      //   if (ref?.current) {
      //     observer.unobserve(ref.current);
      //   }
      observer.disconnect();
    };
  }, []);
  return !imgvisibile ? (
    <img {...props} />
  ) : (
    <img
      ref={ref}
      style={{ width: "1000px", height: "420px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}
    />
  );
};

export default LazyImage;
