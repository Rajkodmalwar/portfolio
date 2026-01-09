import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignatureIntro({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    const finishTimer = setTimeout(() => onFinish(), 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b162c] transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative w-full max-w-4xl h-64 flex flex-col items-center justify-center">
          {/* SVG Signature */}
          <svg
            viewBox="0 0 800 300"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))" }}
          >
            <motion.path
              d="M 150 150 C 150 150, 140 90, 180 90 C 200 90, 190 130, 180 140 C 170 150, 210 150, 220 140 C 230 130, 215 130, 210 140 C 205 150, 240 150, 250 140 L 250 200 C 250 220, 230 220, 230 200 L 260 150 M 280 130 L 280 170 M 280 150 L 300 130 M 290 150 L 310 170 C 320 160, 330 160, 340 160 C 330 180, 350 180, 360 160 C 370 150, 360 180, 380 180 L 380 140 L 380 180 C 390 170, 400 170, 410 180 C 410 170, 420 170, 430 180 C 440 170, 450 170, 460 180 C 470 170, 460 190, 480 190 L 480 170 L 480 190 M 500 150 L 500 190 C 510 190, 520 200, 530 190 L 550 180 C 560 180, 570 190, 580 180 C 590 180, 600 190, 620 180 C 630 170, 650 170, 680 180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Role Text */}
          <motion.div
            className="mt-[-40px] text-sm tracking-[6px] uppercase text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.5,
              duration: 1,
              ease: "easeOut",
            }}
          >
            Full-Stack Developer
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}