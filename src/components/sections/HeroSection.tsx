"use client";
import React, { useRef } from "react";
import { Github, Linkedin, ArrowRight, MessageSquare } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);

  return (
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

        {/* Right Content - RAG Chatbot Placeholder */}
        <div className="relative hidden lg:block h-[600px] w-full">
          <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <div className="relative h-full w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl">
            {/* Chat Header */}
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Portfolio Assistant</h4>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online
                </p>
              </div>
            </div>

            {/* Chat Body Placeholder */}
            <div className="flex-1 py-6 space-y-4 overflow-hidden">
              <div className="bg-white/5 rounded-lg p-4 max-w-[80%] rounded-tl-none">
                <p className="text-sm text-gray-300">
                  Hello! I'm Bharath's AI assistant. Ask me anything about his
                  skills, projects, or experience!
                </p>
              </div>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 max-w-[80%] ml-auto rounded-tr-none">
                <p className="text-sm text-blue-100">
                  Tell me about his Flutter experience.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 max-w-[80%] rounded-tl-none">
                <p className="text-sm text-gray-300">
                  Bharath specializes in Flutter development with BLoC
                  architecture. He has built apps like the Urinary Bladder Level
                  App and Cattle Classifier AI App using Firebase and TensorFlow
                  Lite.
                </p>
              </div>
            </div>

            {/* Chat Input Placeholder */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  disabled
                />
                <button className="p-2 bg-blue-600 rounded-lg text-white opacity-50 cursor-not-allowed">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Chat Icon */}
      <div className="fixed bottom-24 right-6 lg:hidden z-40">
        <button className="w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-white animate-bounce">
          <MessageSquare size={24} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0a0f]" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
