import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let requestId;
    let current = { x: 0, y: 0 };

    const move = (e) => {
      current.x = e.clientX;
      current.y = e.clientY;
    };

    const render = () => {
      // Smooth catch-up motion
      setPos((prev) => ({
        x: prev.x + (current.x - prev.x) * 0.25,
        y: prev.y + (current.y - prev.y) * 0.25,
      }));
      requestId = requestAnimationFrame(render);
    };
    render();

    const handleHover = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      cancelAnimationFrame(requestId);
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{
        transform: `translate(${pos.x - 8}px, ${pos.y - 8}px)`,
      }}
    >
      {/* Main Cursor Dot */}
      <div
        className={`w-4 h-4 rounded-full transition-all duration-150 ${
          hovering 
            ? "scale-[2] bg-[#60A5FA] shadow-[0_0_20px_#3B82F6]" 
            : "scale-100 bg-white shadow-[0_0_15px_rgba(96,165,250,0.8)]"
        }`}
      ></div>
      
      {/* Outer Glow Ring */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          hovering 
            ? "w-12 h-12 border-2 border-[#3B82F6]/50 shadow-[0_0_30px_#2563EB]"
            : "w-8 h-8 border border-[#60A5FA]/30 shadow-[0_0_20px_#60A5FA]"
        }`}
      ></div>
      
      {/* Pulsing Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-[#60A5FA]/20 animate-ping"></div>
    </div>
  );
}