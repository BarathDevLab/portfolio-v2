"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Real brand icons as SVG components
const IconJS = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="currentColor" d="M2 1v125h125V1H2zm66.1 106.4c-1.7 9.3-8.2 15.5-17.2 15.5-9.5 0-15.3-5.7-18.1-10.6l9.8-5.9c1.8 3.2 3.5 5.9 7.5 5.9s6.5-1.6 6.5-7.8V65.3h12.1v41.5c0 .2-.4.4-.6.6zm28.6 15.5c-11.3 0-18.6-5.4-22.2-12.4l9.8-5.7c2.6 4.3 6.1 7.5 12.2 7.5 5.1 0 8.4-2.6 8.4-6.1 0-4.2-3.4-5.7-9-8.2l-3.1-1.3c-9-3.8-14.9-8.6-14.9-18.8 0-9.4 7.1-16.5 18.3-16.5 7.9 0 13.6 2.8 17.7 10.1L105 77c-2-3.6-4.2-5-7.5-5-3.4 0-5.6 2.2-5.6 5 0 3.5 2.2 4.9 7.2 7.1l3.1 1.3c10.6 4.5 16.5 9.2 16.5 19.6 0 11.2-8.8 17.4-20.6 17.4h-.4z"/>
  </svg>
);

const IconReact = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <g fill="currentColor">
      <circle cx="64" cy="64" r="11.4"/>
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM33.5 14.7c1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6-1.7-10.5-.3-17.9 3.8-20.3zM10.5 64c0-4.3 5.5-9.3 14.7-13.2 2-.9 4.2-1.6 6.4-2.3 1.6 5.1 3.6 10.4 6 15.5-2.4 5.1-4.4 10.3-6 15.5-2.2-.7-4.4-1.5-6.4-2.3-9.2-3.8-14.7-8.8-14.7-13.2zM35.5 113.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM94.5 113.3c-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6 1.7 10.5.3 17.9-3.8 20.3zm8.8-30.1c-2 .9-4.2 1.6-6.4 2.3-1.6-5.1-3.6-10.4-6-15.5 2.4-5.1 4.4-10.3 6-15.5 2.2.7 4.4 1.5 6.4 2.3 9.2 3.9 14.7 8.9 14.7 13.2s-5.5 9.3-14.7 13.2z"/>
    </g>
  </svg>
);

const IconFlutter = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="currentColor" d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L86.3 98.5l.1-.1-18.2-18.2-20.6 18.9z"/>
    <path fill="currentColor" d="M86.3 98.4l-17.5-18.3 18.2-17 29.3 0.1z" opacity=".85"/>
  </svg>
);

const IconNode = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="currentColor" d="M112.678 30.334L68.535 4.729a8.822 8.822 0 0 0-8.885 0L15.508 30.334a8.876 8.876 0 0 0-4.42 7.672v51.232c0 3.167 1.69 6.09 4.42 7.672l44.144 25.605a8.822 8.822 0 0 0 8.885 0l44.143-25.605a8.876 8.876 0 0 0 4.42-7.672V38.006a8.876 8.876 0 0 0-4.42-7.672zM77.727 87.3c0 6.082-2.4 11.017-7.2 14.806-4.8 3.79-11.28 5.685-19.44 5.685-6.72 0-12.48-1.343-17.28-4.03v-9.06c5.76 3.355 11.52 5.033 17.28 5.033 8.16 0 12.24-2.686 12.24-8.057 0-2.686-1.068-4.925-3.204-6.717-2.136-1.792-5.46-3.669-9.972-5.632-8.64-3.86-12.96-9.49-12.96-16.876 0-5.579 2.208-10.02 6.624-13.318 4.416-3.299 10.032-4.948 16.848-4.948 5.76 0 11.04 1.009 15.84 3.027v8.725c-4.8-2.52-10.08-3.78-15.84-3.78-3.84 0-6.84.84-9 2.52-2.16 1.68-3.24 3.863-3.24 6.55 0 2.687 1.008 4.863 3.024 6.53 2.016 1.666 5.4 3.5 10.152 5.506 8.64 3.523 12.96 9.07 12.96 16.624v-.588z"/>
  </svg>
);

const IconFirebase = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="currentColor" d="M27.35 80.52l10.68-68.44c.37-2.33 3.5-2.89 4.6-.8l11.48 21.48-26.76 47.76zm75.94 16.63L93.1 34.11c-.31-1.96-2.76-2.76-4.17-1.35L24.71 97.15l34.95 20.2c2.14 1.24 4.76 1.24 6.9 0l36.73-20.2zM74.44 43.77L63.65 22.55c-1.11-2.15-4.23-2.21-5.41-.1l-34.83 62.01 51.03-40.69z"/>
  </svg>
);

const IconN8n = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <circle fill="currentColor" cx="32" cy="64" r="16"/>
    <circle fill="currentColor" cx="64" cy="64" r="16"/>
    <circle fill="currentColor" cx="96" cy="64" r="16"/>
    <path fill="currentColor" d="M48 64h16M80 64h16" strokeWidth="8" stroke="currentColor"/>
  </svg>
);

const IconDocker = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="currentColor" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.9-4.3 2.4-2.8 1-5.9 2-8.9 2H79V46H66V33H41V20H28v13H15v29H2v13H0v14h2v4c0 2.3.4 4.6 1 6.8.5 1.8 1.2 3.5 2.1 5.2 3.6 6.8 9.7 11.2 16.7 13.4 4.5 1.4 9.2 2.1 14 2.1 6.4 0 12.7-1.1 18.6-3.6 7.4-3.1 13.7-8.1 18.6-14.9 6.7-9.3 10.1-21.5 10.1-34.2h8.2c6.3 0 12.5-2.8 15.8-8.2.6-.9 1.2-2.1 1.7-3.4zm-94.4-18v12h12V34H30.4zm0 13H14v12h16.4V47zm0 13H27v12h3.4V60zm0 0H14v12h16.4V60zm-16 13v12h12V73H14.4zm16 0v12h12V73H30.4zm0-26v12h12V47H30.4zm16 26v12h12V73H46.4zm0-13v12h12V60H46.4zm0-13v12h12V47H46.4zm16 26v12h12V73H62.4zm0-13v12h12V60H62.4z"/>
  </svg>
);

const IconLinux = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size}>
    <path fill="currentColor" d="M64 8C35.6 8 12.7 30.9 12.7 59.3c0 11.1 3.5 21.4 9.5 29.8 1.5 2.1 3.2 4.1 5 6l.1.1c8.4 8.7 20.1 14.1 33.2 14.8h7c13.1-.7 24.8-6.1 33.2-14.8l.1-.1c1.8-1.9 3.5-3.9 5-6 6-8.5 9.5-18.8 9.5-29.8C115.3 30.9 92.4 8 64 8zm0 8c23.6 0 42.7 19.1 42.7 42.7 0 9-2.8 17.3-7.5 24.2-1.2 1.7-2.5 3.3-4 4.9l-.1.1c-6.9 7.1-16.4 11.6-27 12.2h-8.2c-10.6-.6-20.1-5.1-27-12.2l-.1-.1c-1.5-1.6-2.8-3.2-4-4.9-4.7-6.9-7.5-15.2-7.5-24.2C21.3 35.1 40.4 16 64 16z"/>
    <circle fill="currentColor" cx="48" cy="52" r="8"/>
    <circle fill="currentColor" cx="80" cy="52" r="8"/>
    <path fill="currentColor" d="M64 80c-11 0-20-4.5-20-10h40c0 5.5-9 10-20 10z"/>
  </svg>
);

const skills = [
  { id: "js", name: "JavaScript", icon: <IconJS />, color: "#f7df1e" },
  { id: "react", name: "React", icon: <IconReact />, color: "#61dafb" },
  { id: "flutter", name: "Flutter", icon: <IconFlutter />, color: "#02569b" },
  { id: "node", name: "Node.js", icon: <IconNode />, color: "#339933" },
  { id: "firebase", name: "Firebase", icon: <IconFirebase />, color: "#ffca28" },
  { id: "n8n", name: "n8n", icon: <IconN8n />, color: "#ff6b6b" },
  { id: "docker", name: "Docker", icon: <IconDocker />, color: "#2496ed" },
  { id: "linux", name: "Linux", icon: <IconLinux />, color: "#fcc624" },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);
  const [activeSkill, setActiveSkill] = useState(skills[0]); // Default to JavaScript
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeIndex = skills.findIndex((s) => s.id === activeSkill.id);
  const angleStep = 360 / skills.length;
  const rotation = 270 - activeIndex * angleStep;

  const wheelSize = isMobile ? 500 : 800;
  const wheelRadius = wheelSize / 2;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Ambient Glow - positioned bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-40 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${activeSkill.color}, transparent 60%)`,
        }}
      />

      {/* Top Section - Title and Description */}
      <div className="relative z-10 px-4 md:px-8 pt-24 pb-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          My <span className="text-blue-500">Skills</span>
        </h2>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
          I specialize in building modern web and mobile applications using cutting-edge technologies. 
          From frontend frameworks to backend services and DevOps tools, I bring ideas to life with clean, 
          efficient code.
        </p>

        <a
          href="#contact"
          className="inline-block px-6 py-3 bg-blue-500 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          contact me
        </a>
      </div>

      {/* Bottom Section - Skill Wheel */}
      <div className="relative flex-1 h-[400px] md:h-[500px] overflow-hidden">
        {/* The Wheel - positioned at bottom center, half visible */}
        <motion.div
          className="absolute left-1/2 rounded-full border border-white/10"
          style={{
            width: wheelSize,
            height: wheelSize,
            marginLeft: -wheelRadius,
            top: "50%",
          }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          {/* Inner circle decoration */}
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute inset-16 rounded-full border border-white/5" />
          
          {/* Skill Icons on the Wheel */}
          {skills.map((skill, index) => {
            const angleDeg = index * angleStep;
            const isActive = activeSkill.id === skill.id;

            return (
              <div
                key={skill.id}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angleDeg}deg) translate(${wheelRadius - 40}px) rotate(-${angleDeg}deg)`,
                  marginLeft: -28,
                  marginTop: -28,
                }}
              >
                <motion.button
                  onClick={() => setActiveSkill(skill)}
                  animate={{ rotate: -rotation }}
                  transition={{ type: "spring", stiffness: 40, damping: 15 }}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 scale-125 shadow-lg"
                      : "bg-[#1a1a20]/80 hover:scale-110 hover:bg-white/10"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 30px ${skill.color}80` : undefined,
                    border: isActive ? `2px solid ${skill.color}` : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ color: isActive ? skill.color : "#9ca3af" }}>
                    {React.cloneElement(
                      skill.icon as React.ReactElement<{ size: number }>,
                      { size: isMobile ? 28 : 32 }
                    )}
                  </div>
                </motion.button>
              </div>
            );
          })}
        </motion.div>

        {/* Center - Active Skill Display (above the wheel) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[10%] md:top-[5%] z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Large Active Icon */}
              <div
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-2xl flex items-center justify-center relative"
                style={{
                  backgroundColor: `${activeSkill.color}20`,
                  boxShadow: `0 0 60px ${activeSkill.color}50`,
                  border: `2px solid ${activeSkill.color}40`,
                }}
              >
                <div style={{ color: activeSkill.color }}>
                  {React.cloneElement(
                    activeSkill.icon as React.ReactElement<{ size: number }>,
                    { size: isMobile ? 56 : 72 }
                  )}
                </div>
              </div>
              
              {/* Skill Name */}
              <h3
                className="text-2xl md:text-4xl font-bold"
                style={{ color: activeSkill.color }}
              >
                {activeSkill.name}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
