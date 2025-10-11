import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

const ScrollFloat = ({ text = "" }) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() =>
    text.split("").map((char, index) => (
      <span key={index} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    )),
    [text]
  );

  useEffect(() => {
    let ctx;
    (async () => {
      if (!containerRef.current) return;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current.querySelectorAll(".inline-block"),
          { opacity: 0, yPercent: 60 },
          {
            opacity: 1,
            yPercent: 0,
            stagger: 0.03,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
        // Esto asegura el recalculo por si hay scroll/layout raro
        ScrollTrigger.refresh();
      }, containerRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <h2 ref={containerRef} className="overflow-hidden text-3xl font-bold text-white lg:text-5xl">
      <span className="inline-block">{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
