import { useScroll, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2563EB] shadow-[0_0_20px_rgba(96,165,250,0.8)] z-[9999] origin-left backdrop-blur-sm ${
        isDarkMode ? 'dark:shadow-[0_0_20px_rgba(59,130,246,0.8)]' : ''
      }`}
      style={{ scaleX: scrollYProgress }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#2563EB] blur-sm opacity-50"></div>
    </motion.div>
  );
}