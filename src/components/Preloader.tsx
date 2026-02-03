"use client";

import { useState, useEffect } from "react";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoaded(true), 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      <div className={`preloader ${isLoaded ? "hidden" : ""}`}>
        <div className="preloader-content">
          <div className="preloader-logo">&lt;<span>GY</span> /&gt;</div>
          <div className="preloader-spinner"></div>
        </div>
      </div>

      <div className={`page-content ${isLoaded ? "visible" : ""}`}>
        {children}
      </div>
    </>
  );
}
