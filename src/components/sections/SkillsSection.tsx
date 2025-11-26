"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Code2,
  Database,
  Smartphone,
  Server,
  Workflow,
  Globe,
  Terminal,
  Layers,
  ArrowRight,
  Cpu,
  GitBranch,
  Cloud,
  FileType,
} from "lucide-react";

const skills = [
  {
    id: "js",
    name: "JavaScript",
    icon: <Code2 size={40} />,
    color: "#f7df1e",
    desc: "Core language for interactive web experiences.",
    achievements: [
      "Developed complex DOM manipulation scripts",
      "Built custom animation libraries",
      "Optimized performance for data-heavy apps",
    ],
  },
  {
    id: "react",
    name: "React.js",
    icon: <Globe size={40} />,
    color: "#61dafb",
    desc: "Building scalable component-based UIs.",
    achievements: [
      "Architected large-scale dashboard applications",
      "Implemented custom hooks and context providers",
      "Integrated Redux and Zustand for state management",
    ],
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: <Smartphone size={40} />,
    color: "#02569b",
    desc: "Cross-platform mobile app development.",
    achievements: [
      "Published apps to Play Store & App Store",
      "Implemented BLoC pattern for robust state management",
      "Integrated native platform channels",
    ],
  },
  {
    id: "node",
    name: "Node.js",
    icon: <Server size={40} />,
    color: "#339933",
    desc: "Scalable backend services and REST APIs.",
    achievements: [
      "Built RESTful APIs with Express.js",
      "Implemented JWT authentication & authorization",
      "Handled real-time data with Socket.io",
    ],
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: <Database size={40} />,
    color: "#ffca28",
    desc: "Serverless backend and real-time database.",
    achievements: [
      "Configured Firestore security rules",
      "Implemented Cloud Functions for automation",
      "Set up push notifications with FCM",
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    icon: <Workflow size={40} />,
    color: "#ff6b6b",
    desc: "Workflow automation and integrations.",
    achievements: [
      "Automated email marketing workflows",
      "Synced data between CRM and databases",
      "Created custom webhooks for external APIs",
    ],
  },
  {
    id: "docker",
    name: "Docker",
    icon: <Layers size={40} />,
    color: "#2496ed",
    desc: "Containerization for consistent deployments.",
    achievements: [
      "Dockerized Node.js and React applications",
      "Managed multi-container setups with Docker Compose",
      "Optimized image sizes for production",
    ],
  },
  {
    id: "linux",
    name: "Linux",
    icon: <Terminal size={40} />,
    color: "#f7df1e", // Keeping yellow/gold theme
    desc: "System administration and shell scripting.",
    achievements: [
      "Managed VPS environments (Ubuntu/Debian)",
      "Automated backups with Bash scripts",
      "Configured Nginx reverse proxies",
    ],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);
  const [activeSkill, setActiveSkill] = useState(skills[1]); // Default to React
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative h-screen flex flex-col bg-[#0a0a0f] overflow-hidden pt-20 pb-0"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeSkill.color}, transparent 70%)`,
        }}
      />

      {/* Center Active Skill Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mt-8 md:mt-0 w-full max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center w-full"
          >
            {/* Large Glowing Icon */}
            <div className="relative inline-block mb-6 md:mb-8">
              <div
                className="absolute inset-0 blur-3xl opacity-40 rounded-full"
                style={{ backgroundColor: activeSkill.color }}
              />
              <div
                className="relative w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-[#1a1a20] border border-white/10 flex items-center justify-center shadow-2xl mx-auto"
                style={{
                  boxShadow: `0 0 30px ${activeSkill.color}30`,
                  borderColor: `${activeSkill.color}40`,
                }}
              >
                <div style={{ color: activeSkill.color }}>
                  {React.cloneElement(
                    activeSkill.icon as React.ReactElement<{ size: number }>,
                    { size: isMobile ? 48 : 64 }
                  )}
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
              {activeSkill.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 font-light max-w-2xl mx-auto">
              {activeSkill.desc}
            </p>

            {/* Achievements List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left max-w-4xl mx-auto">
              {activeSkill.achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-[#121218] border border-white/5 rounded-2xl p-4 md:p-6 hover:bg-white/5 transition-colors h-full flex flex-col"
                >
                  <div
                    className="w-3 h-3 rounded-full mb-3 md:mb-4"
                    style={{ backgroundColor: activeSkill.color }}
                  />
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Wheel (Arc) */}
      <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden mt-8 md:mt-12">
        {/* The Wheel Container */}
        <motion.div
          className="absolute top-[40%] left-1/2 rounded-full border border-white/10 bg-[#0f0f14]/50 backdrop-blur-sm origin-center"
          style={{
            width: isMobile ? "500px" : "800px",
            height: isMobile ? "500px" : "800px",
            marginLeft: isMobile ? "-250px" : "-400px",
          }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          {/* Icons on the Wheel */}
          {skills.map((skill, index) => {
            const angleDeg = index * angleStep;
            const currentRadius = isMobile ? 250 : 400;

            return (
              <div
                key={skill.id}
                className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${angleDeg}deg) translate(${currentRadius}px)`,
                }}
              >
                {/* Counter-rotate the icon container so it stays upright relative to the screen */}
                <motion.button
                  onClick={() => setActiveSkill(skill)}
                  animate={{ rotate: -rotation - angleDeg }}
                  transition={{ type: "spring", stiffness: 40, damping: 15 }}
                  className={`group relative flex items-center justify-center rounded-full border transition-all duration-300 aspect-square ${
                    activeSkill.id === skill.id
                      ? "bg-white/20 scale-125 shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20"
                      : "bg-[#0a0a0f] border-white/10 hover:scale-110 hover:border-white/50 z-10"
                  }`}
                  style={{
                    width: isMobile ? "48px" : "80px",
                    height: isMobile ? "48px" : "80px",
                    borderColor:
                      activeSkill.id === skill.id ? skill.color : undefined,
                  }}
                >
                  <div
                    className="transition-colors duration-300"
                    style={{
                      color:
                        activeSkill.id === skill.id ? skill.color : "#6b7280",
                    }}
                  >
                    {React.cloneElement(
                      skill.icon as React.ReactElement<{ size: number }>,
                      { size: isMobile ? 24 : 32 }
                    )}
                  </div>
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
