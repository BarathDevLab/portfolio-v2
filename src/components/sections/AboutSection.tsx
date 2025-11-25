"use client";
import React, { useRef } from "react";
import { Laptop, Rocket, Settings, GitCommit } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);

  const timeline = [
    {
      year: "2023",
      title: "Entry Into Web Development",
      items: ["Started HTML & CSS fundamentals", "Built responsive web pages"],
      icon: <Laptop size={20} className="text-blue-400" />,
    },
    {
      year: "2024",
      title: "Modern Web Technologies",
      items: [
        "JavaScript, React.js, component architecture",
        "Firebase, Firestore, REST API integration",
      ],
      icon: <Rocket size={20} className="text-purple-400" />,
    },
    {
      year: "2025",
      title: "Full Stack & DevOps (Current)",
      items: [
        "Flutter + BLoC app development",
        "n8n workflow automation",
        "Docker, GitHub Actions, cloud deployments",
      ],
      icon: <Settings size={20} className="text-green-400" />,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-[#0f0f14]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          About <span className="text-blue-500">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Bio */}
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I'm{" "}
                <span className="text-white font-semibold">Bharath G</span>, a
                developer passionate about building scalable, user-focused web
                and mobile applications. I work across React, Next.js, Flutter
                (BLoC), and integrate powerful backend services using Firebase,
                Firestore, and REST APIs.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                I enjoy taking ideas from concept to deployment — whether it's a
                clean UI website, a production-ready Flutter app, or an
                automated workflow using n8n.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                I'm currently expanding my skills in DevOps, focusing on Docker,
                GitHub Actions, cloud deployments, and Linux fundamentals.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GitCommit className="text-blue-500" /> GitHub Activity
              </h3>
              {/* Placeholder for GitHub Graph - In a real app, use react-activity-calendar */}
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 52 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.7
                        ? "bg-green-500"
                        : Math.random() > 0.4
                        ? "bg-green-500/50"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <span>Less</span>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="relative pl-8 border-l border-white/10 space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#0f0f14] border-2 border-blue-500 group-hover:scale-125 transition-transform duration-300" />

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-blue-500 font-mono font-bold">
                    {item.year}
                  </span>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((subItem, i) => (
                    <li
                      key={i}
                      className="text-gray-400 flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600" />
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
