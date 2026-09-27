"use client";

export default function LedLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-[10%] left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full"
        style={{ 
          background: 'radial-gradient(circle, rgba(174,226,132,0.15) 0%, rgba(174,226,132,0) 70%)',
          transform: "translateZ(0)" 
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full"
        style={{ 
          background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0) 70%)',
          transform: "translateZ(0)" 
        }}
      />
    </div>
  );
}
