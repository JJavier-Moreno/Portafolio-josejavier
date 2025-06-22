import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

const ScrollFloat = ({ children }) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    let ctx;

    (async () => {
      if (!containerRef.current) return;

      // 👇 Dinámico para evitar SSR
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current.querySelectorAll(".inline-block"),
          { opacity: 0, yPercent: 100 },
          {
            opacity: 1,
            yPercent: 0,
            stagger: 0.03,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              scrub: true,
            },
          }
        );
      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <h2 ref={containerRef} className="overflow-hidden">
      <span className="inline-block">{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
