import Image from "next/image";
import React from "react";

const RadialGradients = () => (
  <>
    {/* Radial gradient light bottom right */}
    <div
      className="absolute bottom-0 right-0 z-10 hidden h-[150rem] w-[150rem] translate-x-1/2 translate-y-1/2 opacity-90 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(7,162,60,0.8) 0%, transparent 70%)",
      }}
    />

    {/* Radial gradient light top left 1*/}
    <div
      className="absolute right-0 top-14 z-10 hidden h-[60rem] w-[60rem] -translate-y-1/2 translate-x-1/2 opacity-100 md:-left-[45rem] md:top-0 md:block md:opacity-50"
      style={{
        background:
          "radial-gradient(circle, rgba(7,162,60,0.8) 0%, transparent 70%)",
      }}
    />

    {/* Radial gradient light top left 2*/}
    <div
      className="absolute right-0 top-14 z-10 h-[60rem] w-[60rem] -translate-y-1/2 translate-x-1/2 opacity-100 md:-left-[30rem] md:top-0 md:opacity-70"
      style={{
        background:
          "radial-gradient(circle, rgba(7,162,60,0.8) 0%, transparent 70%)",
      }}
    />
  </>
);

const BackgroundLogo = () => (
  <Image
    draggable={false}
    style={{ userSelect: "none", WebkitUserSelect: "none" }}
    src="/logo-only.png"
    alt="logo"
    width={996}
    height={944}
    className="absolute bottom-0 right-0 z-10 w-[120rem] translate-x-1/2 translate-y-1/2 opacity-10 mix-blend-color-dodge md:translate-x-[30rem]"
  />
);

const BackgroundEffects = () => {
  return (
    <>
      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-10 opacity-100 md:opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* Radial gradient light */}
      <RadialGradients />

      {/* Image */}
      <BackgroundLogo />
    </>
  );
};

export default BackgroundEffects;
