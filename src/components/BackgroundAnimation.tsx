"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const BackgroundAnimation = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#111827" },
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: ["#2563EB", "#D946EF", "#FACC15"] },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 4, random: true },
          move: { enable: true, speed: 2, direction: "none", random: true, straight: false },
          links: { enable: true, color: "#ffffff", opacity: 0.3, distance: 150 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
          modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
        },
        detectRetina: true,
      }}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default BackgroundAnimation;
