"use client";
import React, { useRef, useState } from "react";
import { Github, Linkedin, ArrowRight, MessageSquare, X } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import RagChat from "@/components/ui/RagChat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  useScrollAnimation(sectionRef);

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10 px-4 md:px-8"
      >
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 z-10">
            <div className="space-y-2">
              <h2 className="text-blue-500 font-mono text-lg tracking-wide">
                Welcome to my portfolio
              </h2>
              <div className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                <BlurText
                  text="Hi, I'm Bharath G"
                  delay={100}
                  className="text-white"
                />
              </div>
              <h3 className="text-2xl md:text-3xl text-gray-400 font-light">
                Full-Stack Developer & Automation Enthusiast
              </h3>
            </div>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Building scalable web & mobile applications, automating workflows,
              and exploring DevOps pipelines.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2"
              >
                View Projects <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all hover:scale-105 backdrop-blur-sm"
              >
                Contact Me
              </a>
            </div>

            <div className="flex gap-6 mt-8">
              <a
                href="https://github.com/BarathDevLab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover:rotate-12 transform duration-300"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/barathg26/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors hover:-rotate-12 transform duration-300"
              >
                <Linkedin size={28} />
              </a>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-3 mt-8 opacity-80">
              {["React", "Next.js", "Flutter", "Firebase", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full bg-white/5 text-gray-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right Content - RAG Chatbot */}
          <div className="relative hidden lg:block h-[600px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
            <RagChat />
          </div>
        </div>
      </section>

      {/* Mobile Floating Chat Icon */}
      <div className="fixed bottom-24 right-6 lg:hidden z-40">
        <button
          onClick={() => setIsMobileChatOpen(true)}
          className="w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-white animate-bounce hover:scale-110 transition-transform"
        >
          <MessageSquare size={24} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
        </button>
      </div>

      {/* Mobile Chat Modal */}
      {isMobileChatOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileChatOpen(false)}
          />
          {/* Modal Content */}
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] p-4">
            <RagChat isModal onClose={() => setIsMobileChatOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;

