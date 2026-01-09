import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SignatureIntro from "./components/SignatureIntro";
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdSchool } from "react-icons/md";
import ScrollProgressBar from "./components/ScrollProgressBar";
import SkillMap from "./components/SkillMap";
import Timeline from "./components/Timeline";
import DarkModeToggle from "./components/DarkModeToggle";
import { useTheme } from "./context/ThemeContext";

// Fog Canvas Component (Light version for white background)
const FogCanvas = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const noise = (x, y, t) => {
      return Math.sin(x * 0.01 + y * 0.01 + t) * 0.5 + 0.5;
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Adjust colors based on theme
      const color1 = isDarkMode ? '37, 99, 235' : '37, 99, 235';
      const color2 = isDarkMode ? '30, 64, 175' : '30, 64, 175';
      const opacity1 = isDarkMode ? 0.03 : 0.02;
      const opacity2 = isDarkMode ? 0.02 : 0.01;
      
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      gradient.addColorStop(0, `rgba(${color1}, ${opacity1})`);
      gradient.addColorStop(0.5, `rgba(${color2}, ${opacity2})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Subtle fog layers
      for (let i = 0; i < 2; i++) {
        const layerTime = time * (0.2 + i * 0.1);
        const opacity = isDarkMode ? 0.08 + i * 0.04 : 0.05 + i * 0.03;
        
        ctx.fillStyle = `rgba(${color1}, ${opacity})`;
        ctx.beginPath();
        
        for (let x = 0; x < width; x += 80) {
          for (let y = 0; y < height; y += 80) {
            const n = noise(x, y, layerTime + i * 100);
            if (n > 0.7) {
              const size = 80 + n * 150;
              const radius = size * n;
              
              ctx.moveTo(x + radius, y);
              ctx.arc(x, y, radius, 0, Math.PI * 2);
            }
          }
        }
        
        ctx.fill();
      }
      
      time += 0.01;
      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 mix-blend-multiply opacity-30 ${
        isDarkMode ? 'mix-blend-soft-light' : ''
      }`}
      style={{ background: 'transparent' }}
    />
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeNav, setActiveNav] = useState("HOME");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: "HOME", label: "Home", icon: <BsPersonWorkspace /> },
    { id: "PROJECTS", label: "Projects", icon: <AiOutlineProject /> },
    { id: "SKILLS", label: "Skills", icon: <FaCode /> },
    { id: "JOURNEY", label: "Journey", icon: <MdSchool /> },
    { id: "CONTACT", label: "Contact", icon: <FaEnvelope /> }
  ];

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    const sectionId = navId.toLowerCase() === 'journey' ? 'timeline' : navId.toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "JustQuick – Hyperlocal Delivery Platform",
      description: "Local vendor-to-customer delivery solution with real-time updates and secure payments.",
      tech: "React, Node.js, MongoDB, Socket.io",
      link: "#",
      category: "Full Stack"
    },
    {
      title: "Wi-Fi Presence Detection (IEEE Publication)",
      description: "AI sensing using Wi-Fi CSI data and ESP32 for human presence detection.",
      tech: "Python, TensorFlow, Flask, ESP32",
      link: "#",
      category: "AI/ML Research"
    },
    {
      title: "SOP Management System (Bosch)",
      description: "AI-based SOP management and automated PDF generation platform.",
      tech: "Django, PostgreSQL, AI PDF Processor",
      link: "#",
      category: "Enterprise"
    },
    {
      title: "DesignX – T-Shirt Customization Platform",
      description: "Web tool to design T-shirts with real-time preview and dynamic pricing.",
      tech: "React, Node.js, Cloudinary, Stripe",
      link: "#",
      category: "E-commerce"
    },
    {
      title: "Auction Bidding Platform",
      description: "Real-time live bidding system with secure authentication and payments.",
      tech: "MERN, Socket.io, JWT Auth, Redis",
      link: "#",
      category: "Real-time"
    },
  ];

  const certifications = [
    {
      title: "Google Cloud Computing Foundations",
      issuer: "Google Cloud",
      link: "https://www.skills.google/public_profiles/e42f1038-c751-4432-9103-d8f6a5b49295/badges/17215813",
    },
    {
      title: "Google Cloud Networking & Security",
      issuer: "Google Cloud",
      link: "https://www.skills.google/public_profiles/e42f1038-c751-4432-9103-d8f6a5b49295/badges/14992910",
    },
    {
      title: "Google Cloud Data, ML, and AI",
      issuer: "Google Cloud",
      link: "https://www.skills.google/public_profiles/e42f1038-c751-4432-9103-d8f6a5b49295/badges/14978030",
    },
  ];

  return (
    <>
      {showIntro && <SignatureIntro onFinish={() => setShowIntro(false)} />}
      {!showIntro && <ScrollProgressBar />}

      {/* Global Fog Canvas */}
      <FogCanvas />

      <motion.div
        className={`transition-opacity duration-[1200ms] relative font-times ${
          isDarkMode ? 'dark:bg-[#0F0F1A]' : 'bg-white'
        }`}
      >
        {/* Improved Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`fixed top-0 w-full z-50 transition-all duration-300 font-times ${
            isScrolled 
              ? 'backdrop-blur-xl shadow-lg border-b' 
              : 'backdrop-blur-lg'
          } ${
            isDarkMode 
              ? 'bg-[#0F0F1A]/90 border-gray-800' 
              : 'bg-white/90 border-gray-200/50'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between p-4 lg:p-6">
            <motion.h1 
              className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              RAJ KODMALWAR
            </motion.h1>
            
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex gap-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
                      activeNav === item.id
                        ? "text-white bg-gradient-to-r from-[#1E40AF] to-[#2563EB] shadow-lg shadow-blue-500/25"
                        : isDarkMode 
                          ? "text-gray-300 hover:text-white hover:bg-gray-800" 
                          : "text-gray-700 hover:text-[#2563EB] hover:bg-gray-100"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden flex gap-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      activeNav === item.id
                        ? "text-white bg-gradient-to-r from-[#1E40AF] to-[#2563EB]"
                        : isDarkMode 
                          ? "text-gray-400 hover:text-white hover:bg-gray-800" 
                          : "text-gray-600 hover:text-[#2563EB] hover:bg-gray-100"
                    }`}
                    whileTap={{ scale: 0.9 }}
                    title={item.label}
                  >
                    <span className="text-lg">{item.icon}</span>
                  </motion.button>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <DarkModeToggle />

              <motion.a
                href="/Raj_Kodmalwar_Resume.pdf"
                download
                className="px-4 py-2 lg:px-6 lg:py-3 text-white bg-gradient-to-r from-[#1E40AF] to-[#2563EB] rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className={`min-h-screen pt-24 lg:pt-32 pb-24 px-6 lg:px-8 relative overflow-hidden font-times ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#0F0F1A] via-[#1A1B2E] to-[#0F0F1A]' 
            : 'bg-gradient-to-br from-white via-blue-50/30 to-white'
        }`}>
          {/* Hero Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {isDarkMode ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1A] via-[#1A1B2E] to-[#0F0F1A]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#2563EB]/25 via-[#1E40AF]/20 to-[#2563EB]/25 rounded-full blur-[100px]"></div>
              </>
            ) : (
              <>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/40 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-blue-50/30 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#2563EB]/10 via-[#1E40AF]/8 to-[#2563EB]/10 rounded-full blur-[80px]"></div>
              </>
            )}
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Main Title */}
              <div className="mb-8">
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-white via-[#1E40AF] to-[#2563EB]' 
                    : 'from-[#0F172A] via-[#1E40AF] to-[#2563EB]'
                } bg-clip-text text-transparent`}>
                  FULL-STACK
                </h1>
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-[#2563EB] via-[#1E40AF] to-white' 
                    : 'from-[#2563EB] via-[#1E40AF] to-[#0F172A]'
                } bg-clip-text text-transparent`}>
                  DEVELOPER
                </h1>
              </div>
              
              <motion.p 
                className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-[#475569]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Building the future with <span className="text-[#2563EB] font-semibold">AI-driven solutions</span> and 
                <span className="text-[#1E40AF] font-semibold"> scalable software</span>. Integrated M.Tech student at VIT-AP University.
              </motion.p>
              
              <motion.div 
                className="flex justify-center gap-4 lg:gap-6 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("PROJECTS");
                  }}
                  className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base lg:text-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("CONTACT");
                  }}
                  className={`px-6 lg:px-8 py-3 lg:py-4 border-2 rounded-xl hover:bg-[#2563EB] hover:text-white transition-all duration-300 font-semibold text-base lg:text-lg ${
                    isDarkMode 
                      ? 'border-[#60A5FA] text-[#60A5FA]' 
                      : 'border-[#2563EB] text-[#2563EB]'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
              isDarkMode ? 'border-[#60A5FA]' : 'border-[#2563EB]'
            }`}>
              <div className={`w-1 h-3 rounded-full mt-2 ${
                isDarkMode ? 'bg-[#60A5FA]' : 'bg-[#2563EB]'
              }`}></div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 lg:py-28 px-6 lg:px-8 relative overflow-hidden font-times ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#0F0F1A] via-[#1A1B2E] to-[#0F0F1A]' 
            : 'bg-white'
        }`}>
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 items-center gap-12 lg:gap-16"
            >
              <div className="flex justify-center order-2 md:order-1">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] p-1">
                    <img
                      src="/assets/profile.jpg"
                      alt="Raj Kodmalwar"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-2xl blur-xl opacity-20 -z-10"></div>
                </motion.div>
              </div>
              
              <div className="space-y-6 order-1 md:order-2">
                <h2 className={`text-3xl lg:text-4xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-[#0F172A]'
                }`}>
                  About Me
                </h2>
                
                <motion.p 
                  className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-[#475569]'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  I'm an Integrated M.Tech student at VIT-AP University specializing in Computer Science and Engineering. 
                  I bridge the gap between cutting-edge AI research and practical software development.
                </motion.p>
                
                <motion.p 
                  className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-400' : 'text-[#64748B]'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  My expertise spans full-stack development, machine learning, and cloud infrastructure. 
                  I'm passionate about creating solutions that are not just functional, but intelligent and scalable.
                </motion.p>
                
                <motion.div 
                  className="flex gap-4 lg:gap-6 pt-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    { number: "5+", label: "Projects", color: "from-[#2563EB] to-[#3B82F6]" },
                    { number: "3+", label: "Certifications", color: "from-[#1E40AF] to-[#2563EB]" },
                    { number: "2+", label: "Years Experience", color: "from-[#2563EB] to-[#60A5FA]" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.number}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-[#64748B]'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Always dark blue */}
        <SkillMap />

        {/* Projects Section with Improved Cards */}
        <section id="projects" className={`py-20 lg:py-24 px-6 lg:px-8 relative overflow-hidden font-times ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#0F0F1A] via-[#1A1B2E] to-[#0F0F1A]' 
            : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 lg:mb-16"
            >
              <h3 className={`text-3xl lg:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-[#0F172A]'
              }`}>
                Featured Projects
              </h3>
              <p className={`text-lg lg:text-xl max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-[#475569]'
              }`}>
                Building solutions that matter - from AI research to enterprise applications
              </p>
            </motion.div>

            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="group"
                >
                  <div className={`rounded-2xl p-6 hover:border-[#2563EB]/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-2xl relative overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-gray-900/60 border-gray-700/30' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-[#1E40AF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Category Badge */}
                    <div className="mb-4 relative z-10">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${
                        isDarkMode 
                          ? 'text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/20' 
                          : 'text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20'
                      }`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h4 className={`font-bold text-xl mb-3 group-hover:text-[#2563EB] transition-colors duration-300 relative z-10 ${
                      isDarkMode ? 'text-white' : 'text-[#0F172A]'
                    }`}>
                      {project.title}
                    </h4>

                    {/* Project Description */}
                    <p className={`mb-4 flex-grow leading-relaxed relative z-10 ${
                      isDarkMode ? 'text-gray-300' : 'text-[#475569]'
                    }`}>
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4 relative z-10">
                      <p className={`text-sm italic mb-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-[#64748B]'
                      }`}>
                        Tech Stack:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.split(', ').map((tech, index) => (
                          <span key={index} className={`px-2 py-1 text-xs rounded-md border ${
                            isDarkMode 
                              ? 'bg-gray-800/80 text-gray-300 border-gray-700' 
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.a
                      href={project.link}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group/btn relative z-10 mt-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Project
                      <FaExternalLinkAlt className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline - Always dark blue */}
        <Timeline />

        {/* Certifications with Improved Cards */}
        <section id="certifications" className={`py-20 lg:py-24 px-6 lg:px-8 relative overflow-hidden font-times ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#0F0F1A] via-[#1A1B2E] to-[#0F0F1A]' 
            : 'bg-white'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16 ${
                isDarkMode ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Certifications
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {certifications.map((cert, i) => (
                <motion.a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`rounded-2xl p-6 text-center hover:border-[#2563EB]/50 transition-all duration-300 group shadow-lg hover:shadow-2xl relative overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-gray-900/60 border-gray-700/30' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-[#1E40AF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <h4 className={`font-semibold text-lg mb-3 group-hover:text-[#2563EB] transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-[#0F172A]'
                    }`}>
                      {cert.title}
                    </h4>
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-[#475569]'
                    }`}>
                      {cert.issuer}
                    </p>
                    <div className={`text-xs font-semibold rounded-lg py-2 px-4 transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-[#60A5FA] border border-[#60A5FA] bg-[#60A5FA]/5 hover:bg-[#60A5FA] hover:text-white' 
                        : 'text-[#2563EB] border border-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB] hover:text-white'
                    }`}>
                      View Credential →
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`py-20 lg:py-28 px-6 lg:px-8 text-center font-times ${
          isDarkMode ? 'bg-[#0F0F1A]' : 'bg-gray-50'
        }`}>
          <div className="max-w-4xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-3xl lg:text-4xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Let's Build Something Amazing
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-lg lg:text-xl mb-8 lg:mb-12 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-[#475569]'
              }`}
            >
              Ready to bring your ideas to life? Let's discuss how we can work together to create innovative solutions.
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-6 lg:gap-8 text-2xl lg:text-3xl text-[#1E40AF] mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a 
                href="mailto:rajkodmalwar.in@gmail.com" 
                className={`hover:scale-110 transition-transform p-3 lg:p-4 rounded-full ${
                  isDarkMode ? 'hover:bg-[#1E40AF]/10' : 'hover:bg-[#1E40AF]/10'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <FaEnvelope />
              </motion.a>
              <motion.a 
                href="https://github.com/Rajkodmalwar" 
                target="_blank" 
                className={`hover:scale-110 transition-transform p-3 lg:p-4 rounded-full ${
                  isDarkMode ? 'hover:bg-[#1E40AF]/10' : 'hover:bg-[#1E40AF]/10'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/rajkodmalwar" 
                target="_blank" 
                className={`hover:scale-110 transition-transform p-3 lg:p-4 rounded-full ${
                  isDarkMode ? 'hover:bg-[#1E40AF]/10' : 'hover:bg-[#1E40AF]/10'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedin />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`rounded-2xl p-6 lg:p-8 border max-w-md mx-auto shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-900/60 border-gray-700/30' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <p className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-[#0F172A]'
              }`}>
                Currently available for new opportunities
              </p>
              <motion.a
                href="mailto:rajkodmalwar.in@gmail.com"
                className="inline-block px-6 lg:px-8 py-3 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 w-full text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Conversation
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-6 lg:py-8 text-center text-sm border-t font-times ${
          isDarkMode 
            ? 'bg-[#0F0F1A]/80 border-gray-800/50 text-gray-400' 
            : 'bg-white border-gray-200 text-[#64748B]'
        }`}>
          <div className="max-w-6xl mx-auto">
            <p>© {new Date().getFullYear()} Raj Kodmalwar — Crafted with passion and precision</p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}