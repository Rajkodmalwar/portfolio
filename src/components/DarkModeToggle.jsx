// src/components/DarkModeToggle.jsx
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`relative p-3 rounded-full transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        animate={{ rotate: isDarkMode ? 360 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-lg"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </motion.div>
    </motion.button>
  );
}