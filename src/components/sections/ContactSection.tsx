"use client";
import React, { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Let's Build Something <span className="text-blue-500">Together</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Open to collaborations, freelance work, and exciting projects.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-6">Connect with me</h3>

            <div className="space-y-6">
              <a
                href="mailto:contact@bharath.dev"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">contact@bharath.dev</p>
                </div>
              </a>

              <a
                href="https://github.com/BarathDevLab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Github className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">GitHub</p>
                  <p className="font-medium">github.com/BarathDevLab</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/barathg26/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-700/10 flex items-center justify-center group-hover:bg-blue-700/20 transition-colors">
                  <Linkedin className="text-blue-700" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <p className="font-medium">linkedin.com/in/barathg26</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm text-gray-400">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Project Collaboration"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
