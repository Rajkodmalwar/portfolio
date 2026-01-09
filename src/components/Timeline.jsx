import { motion } from "framer-motion";

const events = [
  {
    year: "May – Jul 2025",
    title: "BEL Hyderabad Internship",
    desc: "Developed AI LLM Bot for ESM System — real-time signal processing and semantic response generation.",
    icon: "🤖"
  },
  {
    year: "2024",
    title: "IEEE Publication",
    desc: "Published paper on human presence detection using Wi-Fi CSI signals and ESP32 sensor arrays.",
    icon: "📡"
  },
  {
    year: "2023",
    title: "Full-Stack Development",
    desc: "Built multiple web applications using MERN stack and cloud technologies for diverse clients.",
    icon: "💻"
  },
  {
    year: "2022",
    title: "AI/ML Research Beginnings",
    desc: "Started research in machine learning and computer vision applications with focus on edge computing.",
    icon: "🧠"
  },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-32 px-4 md:px-8 relative overflow-hidden bg-[#0F0F1A]"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#2563EB] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-[#1E40AF] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      </div>

      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-24 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-times mb-4">
          Professional Journey
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-50"></div>
      </motion.div>

      {/* --- TIMELINE CONTAINER --- */}
      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Central Laser Beam */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#1A1B2E] overflow-hidden hidden md:block">
            <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-[20%] bg-gradient-to-b from-transparent via-[#60A5FA] to-transparent shadow-[0_0_20px_#60A5FA]"
            />
            <div className="absolute inset-0 bg-white/5"></div>
        </div>

        {events.map((ev, i) => (
          <div key={i} className="flex flex-col md:flex-row justify-between items-center w-full mb-16 md:mb-24">
            
            {/* LEFT SIDE (Card if Even, Spacer if Odd) */}
            <div className="w-full md:w-[45%] mb-8 md:mb-0 order-2 md:order-1 flex justify-center md:justify-end">
                {i % 2 === 0 ? (
                    <TimelineCard ev={ev} align="right" />
                ) : (
                    <div className="hidden md:block" /> // Spacer
                )}
            </div>

            {/* CENTER NODE */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center order-1 md:order-2 h-full md:h-auto top-0 md:top-auto">
                {/* Outer Ring Animation */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border border-dashed border-[#3B82F6]/30 absolute hidden md:block"
                />
                
                {/* Core Dot */}
                <motion.div 
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-[#0F0F1A] border-2 border-[#60A5FA] shadow-[0_0_15px_#60A5FA] z-20 relative"
                >
                    <div className="absolute inset-0 bg-[#60A5FA] rounded-full animate-ping opacity-20"></div>
                </motion.div>
            </div>

            {/* RIGHT SIDE (Card if Odd, Spacer if Even) */}
            <div className="w-full md:w-[45%] order-3 flex justify-center md:justify-start pl-8 md:pl-0">
                {i % 2 !== 0 ? (
                    <TimelineCard ev={ev} align="left" />
                ) : (
                    <div className="hidden md:block" /> // Spacer
                )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

// Extracted Card Component for cleaner code
function TimelineCard({ ev, align }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: align === "right" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative group w-full max-w-md"
        >
            {/* Connector Arm (Desktop Only) */}
            <div 
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-gradient-to-r from-[#3B82F6]/50 to-transparent
                ${align === "right" ? "-right-12 rotate-180" : "-left-12"}
                `} 
            />

            <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-[#0F0F1A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl relative overflow-hidden text-left"
                style={{
                  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.5)"
                }}
            >
                {/* Hover Gradient Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                {/* Tech Corners */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20"></div>

                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                            {ev.icon}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-mono text-[#60A5FA] bg-[#60A5FA]/10 rounded border border-[#60A5FA]/20">
                            {ev.year}
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 font-times tracking-wide group-hover:text-[#60A5FA] transition-colors">
                        {ev.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {ev.desc}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}