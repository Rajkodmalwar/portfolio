import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const skills = [
  {
    category: "Frontend",
    color: "#60A5FA",
    tools: ["React", "HTML5", "CSS3", "Tailwind", "Vite", "TypeScript"],
  },
  {
    category: "Backend",
    color: "#3B82F6",
    tools: ["Node.js", "Express", "MongoDB", "Flask", "Django", "PostgreSQL"],
  },
  {
    category: "AI / ML",
    color: "#2563EB",
    tools: ["Python", "TensorFlow", "Scikit-learn", "OpenCV", "PyTorch"],
  },
  {
    category: "DevOps / Cloud",
    color: "#1E40AF",
    tools: ["Docker", "GitHub Actions", "Google Cloud", "Vercel", "AWS"],
  },
];

export default function SkillMap() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="skills"
      // CHANGED: overflow-visible ensures the tooltip isn't cut off when popping up
      className="py-32 px-8 text-center relative overflow-visible bg-[#0F0F1A]"
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
        }} 
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1E40AF] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-20" // Increased margin-bottom to give space for tooltips
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-times mb-4">
          Technical Skills
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-50"></div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-16 relative z-10 max-w-6xl mx-auto">
        {skills.map((s, i) => (
          <SkillOrb 
            key={i} 
            skill={s} 
            index={i} 
            isHovered={hovered === i} 
            setHovered={setHovered} 
          />
        ))}
      </div>
    </section>
  );
}

function SkillOrb({ skill, index, isHovered, setHovered }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered(null)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
        className="relative"
      >
        {/* Orbital Rings */}
        <div className="absolute inset-0 -m-4 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className={`absolute inset-0 -m-4 border-t border-r border-transparent rounded-full animate-[spin_3s_linear_infinite] ${isHovered ? 'border-white/20' : 'border-transparent'}`} />

        {/* Main Sphere */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative z-10 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full cursor-pointer"
          style={{
            background: `radial-gradient(120% 120% at 30% 30%, rgba(255,255,255,0.1) 0%, ${skill.color}20 50%, ${skill.color}10 100%)`,
            boxShadow: `
              inset 2px 2px 4px rgba(255,255,255,0.2),
              inset -2px -2px 10px rgba(0,0,0,0.2),
              0 0 20px ${skill.color}30
            `,
            border: `1px solid rgba(255,255,255,0.1)`
          }}
        >
          <div 
            className="absolute w-full h-full rounded-full opacity-40"
            style={{ background: `radial-gradient(circle at 40% 40%, ${skill.color}, transparent 60%)`, filter: 'blur(20px)' }}
          />
          <span className="relative z-20 text-lg md:text-xl font-bold text-white tracking-wide font-times drop-shadow-lg">
            {skill.category}
          </span>
        </motion.div>

        {/* --- TOOLTIP (NOW ABOVE) --- */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }} // Starts slightly down
              animate={{ opacity: 1, y: 0, scale: 1 }}    // Moves up to position
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              // CHANGED: bottom-full moves it above, mb-6 adds spacing
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-6 w-64 z-50"
            >
              <div 
                className="bg-[#0F0F1A]/95 backdrop-blur-xl border border-white/10 p-4 rounded-xl text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              >
                {/* CHANGED: Arrow is now at the bottom */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0F0F1A]/95 border-b border-r border-white/10 rotate-45"></div>
                
                <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-bold">Stack</h4>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {skill.tools.map((tool, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2 py-1 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-md"
                      style={{ boxShadow: `0 0 10px ${skill.color}20` }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-4 rounded-[100%] bg-black/40 blur-md transition-all duration-500"
        style={{ transform: isHovered ? 'translateX(-50%) scale(0.8)' : 'translateX(-50%) scale(1)' }}
      />
    </motion.div>
  );
}