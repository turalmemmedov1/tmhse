"use client";

export default function LedLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-[10%] left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/10 rounded-full blur-[80px] md:blur-[120px]"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-green-500/5 rounded-full blur-[80px] md:blur-[120px]"
        style={{ transform: "translateZ(0)" }}
      />
    </div>
  );
}
