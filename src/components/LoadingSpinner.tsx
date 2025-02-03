"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const LoadingSpinner = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    gsap.to(loaderRef.current, { rotation: 360, repeat: -1, duration: 1, ease: "linear" });
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div ref={loaderRef} className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
