"use client";
import React, { useState, useRef } from "react";
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
} from "lucide-react";

const skills = [
  {
    id: "js",
    name: "JavaScript",
    icon: <Code2 size={32} />,
    color: "#f7df1e",
    desc: "Modern ES6+ for dynamic web apps",
  },
  {
    id: "react",
    name: "React.js",
    icon: <Globe size={32} />,
    color: "#61dafb",
    desc: "Component-based UI architecture",
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: <Smartphone size={32} />,
    color: "#02569b",
    desc: "Cross-platform mobile development",
  },
  {
    id: "node",
    name: "Node.js",
    icon: <Server size={32} />,
    color: "#339933",
    desc: "Backend services and APIs",
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: <Database size={32} />,
    color: "#ffca28",
    desc: "Real-time database and authentication",
  },
  {
    id: "n8n",
    name: "n8n",
    icon: <Workflow size={32} />,
    color: "#ff6b6b",
    desc: "Workflow automation pipelines",
  },
  {
    id: "docker",
    name: "Docker",
    icon: <Layers size={32} />,
    color: "#2496ed",
    desc: "Containerization and deployment",
  },
  {
    id: "linux",
    name: "Linux",
    icon: <Terminal size={32} />,
    color: "#f7df1e",
    desc: "System administration & scripting",
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);
  const [activeSkill, setActiveSkill] = useState(skills[1]); // Default to React

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-[#0a0a0f] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Info */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-blue-500">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            My journey started with web development, evolved into mobile apps
            with Flutter, and is now expanding into DevOps and automation.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"
          >
            Contact Me
          </a>
        </div>

        {/* Center & Right - Interactive Wheel */}
        <div className="lg:col-span-2 relative min-h-[500px] flex items-center justify-center">
          {/* Center Highlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute z-20 flex flex-col items-center text-center p-8 rounded-full bg-[#0f0f14] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-64 h-64 justify-center"
            >
              <div
                className="mb-4 p-4 rounded-full bg-white/5"
                style={{
                  color: activeSkill.color,
                  boxShadow: `0 0 20px ${activeSkill.color}40`,
                }}
              >
                {activeSkill.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {activeSkill.name}
              </h3>
              <p className="text-sm text-gray-400">{activeSkill.desc}</p>

              {/* Neon Glow Background */}
              <div
                className="absolute inset-0 rounded-full -z-10 opacity-20 blur-2xl"
                style={{ backgroundColor: activeSkill.color }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Orbiting Skills */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 relative animate-spin-slow">
              {skills.map((skill, index) => {
                const angle = (index / skills.length) * 2 * Math.PI;
                const radius = 50; // Percentage
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);

                return (
                  <button
                    key={skill.id}
                    onClick={() => setActiveSkill(skill)}
                    className={`absolute w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      activeSkill.id === skill.id
                        ? "bg-white/10 border-white scale-110"
                        : "bg-[#0a0a0f] border-white/10 hover:border-white/50 hover:scale-110"
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `rotate(-${(index / skills.length) * 360}deg)`, // Counter-rotate to keep icons upright if parent spins
                    }}
                  >
                    <div style={{ color: skill.color }}>
                      {React.cloneElement(
                        skill.icon as React.ReactElement<{ size: number }>,
                        { size: 24 }
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
