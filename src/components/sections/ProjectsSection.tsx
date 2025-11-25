"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink, Github, FileText, CheckCircle2 } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";

type Project = {
  id: number;
  title: string;
  category: "Web" | "Mobile" | "Auth & AI";
  shortDesc: string;
  fullDesc: {
    problem: string;
    solution: string;
    impact: string;
  };
  tech: string[];
  features: string[];
  gradient: string;
  image: string;
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
};

const projects: Project[] = [
  {
    id: 1,
    title: "First Website (Menu Added)",
    category: "Web",
    shortDesc: "Basic website with menu structure",
    fullDesc: {
      problem: "Need for a foundational understanding of web layout.",
      solution: "Built a responsive site with a functional navigation menu.",
      impact: "Established core HTML/CSS skills.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Responsive Menu", "Semantic HTML", "Basic Styling"],
    gradient: "from-pink-500 to-purple-600",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 2,
    title: "Netflix UI Clone",
    category: "Web",
    shortDesc: "Responsive UI clone with layout fixes",
    fullDesc: {
      problem: "Replicating complex UI layouts.",
      solution: "Cloned Netflix's interface using CSS Grid and Flexbox.",
      impact: "Mastered responsive design principles.",
    },
    tech: ["React", "CSS", "Responsive Design"],
    features: ["Hero Banner", "Movie Rows", "Responsive Grid"],
    gradient: "from-red-600 to-red-900",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 3,
    title: "Tesla Landing Page Clone",
    category: "Web",
    shortDesc: "Modern static Tesla-style webpage",
    fullDesc: {
      problem: "Creating high-fidelity static pages.",
      solution: "Recreated Tesla's landing page with Tailwind CSS.",
      impact: "Improved attention to detail in UI.",
    },
    tech: ["Next.js", "Tailwind CSS"],
    features: ["Full-screen Sections", "Snap Scrolling", "Minimalist Design"],
    gradient: "from-gray-700 to-black",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 4,
    title: "Weather WebApp",
    category: "Web",
    shortDesc: "Real-time weather data using API",
    fullDesc: {
      problem: "Fetching and displaying dynamic data.",
      solution: "Integrated OpenWeatherMap API with React.",
      impact: "Learned API handling and state management.",
    },
    tech: ["React", "Weather API", "Axios"],
    features: ["Real-time Data", "Search Functionality", "Dynamic Icons"],
    gradient: "from-blue-400 to-cyan-500",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 5,
    title: "Smart To-Do (AI)",
    category: "Web",
    shortDesc: "Task manager with AI suggestions",
    fullDesc: {
      problem: "Task management lacks intelligence.",
      solution: "Added AI to suggest task prioritization.",
      impact: "Enhanced user productivity.",
    },
    tech: ["React", "AI/ML", "Firebase"],
    features: ["AI Suggestions", "Task Categorization", "Cloud Sync"],
    gradient: "from-green-500 to-teal-600",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 6,
    title: "Expense Tracker",
    category: "Web",
    shortDesc: "Tracks spending with categories/charts",
    fullDesc: {
      problem: "Visualizing personal finances.",
      solution: "Built a tracker with Chart.js visualization.",
      impact: "Better financial awareness for users.",
    },
    tech: ["React", "Chart.js", "LocalStorage"],
    features: ["Expense Logging", "Visual Charts", "Category Filtering"],
    gradient: "from-orange-500 to-yellow-500",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 7,
    title: "Nutpam 2K25 App",
    category: "Web",
    shortDesc: "Event/college app",
    fullDesc: {
      problem: "Managing college event information.",
      solution: "Centralized app for schedules and updates.",
      impact: "Streamlined event communication.",
    },
    tech: ["React", "Firebase", "REST API"],
    features: ["Event Schedule", "Notifications", "User Registration"],
    gradient: "from-indigo-500 to-purple-600",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 8,
    title: "Urinary Bladder Level App",
    category: "Mobile",
    shortDesc: "Tracks bladder fullness levels",
    fullDesc: {
      problem: "Monitoring health metrics efficiently.",
      solution: "Mobile app to track and log bladder levels.",
      impact: "Assisted in medical monitoring.",
    },
    tech: ["Flutter", "BLoC", "Firebase"],
    features: ["Real-time Tracking", "Data Logging", "Alerts"],
    gradient: "from-blue-600 to-blue-400",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 9,
    title: "Urinary Bladder Backend",
    category: "Mobile",
    shortDesc: "API backend for bladder app",
    fullDesc: {
      problem: "Backend support for health app.",
      solution: "Node.js API for data storage and retrieval.",
      impact: "Reliable data persistence.",
    },
    tech: ["Node.js", "Express", "Firebase"],
    features: ["RESTful Endpoints", "Secure Data", "Scalable Architecture"],
    gradient: "from-green-600 to-emerald-700",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 10,
    title: "BLoC To-Do App",
    category: "Mobile",
    shortDesc: "Block-based productivity manager",
    fullDesc: {
      problem: "State management in complex apps.",
      solution: "Implemented BLoC pattern for predictable state.",
      impact: "Clean, testable code architecture.",
    },
    tech: ["Flutter", "BLoC Pattern", "Firestore"],
    features: ["State Management", "Offline Support", "Cloud Sync"],
    gradient: "from-purple-600 to-pink-500",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 11,
    title: "Login System",
    category: "Auth & AI",
    shortDesc: "Secure user authentication flow",
    fullDesc: {
      problem: "Secure user access control.",
      solution: "Robust auth system with Firebase.",
      impact: "Protected user data effectively.",
    },
    tech: ["Firebase Auth", "React", "Email/OTP"],
    features: ["Multi-factor Auth", "Social Login", "Secure Session"],
    gradient: "from-teal-500 to-blue-600",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
  {
    id: 12,
    title: "Cattle Classifier AI App",
    category: "Auth & AI",
    shortDesc: "Image-based cattle classification",
    fullDesc: {
      problem: "Automating cattle breed identification.",
      solution: "AI model integrated into mobile app.",
      impact: "Faster, accurate identification.",
    },
    tech: ["Flutter", "TensorFlow Lite", "Firebase"],
    features: ["Image Recognition", "Offline Model", "Breed Info"],
    gradient: "from-amber-700 to-orange-600",
    image: "/images/project-placeholder.png",
    links: { github: "#" },
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-[#0f0f14]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Featured <span className="text-blue-500">Projects</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[800px]">
          {/* Left Panel - Scrollable List */}
          <div className="lg:col-span-5 overflow-y-auto pr-4 space-y-4 scrollbar-hide h-full">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedProject.id === project.id
                    ? "bg-white/10 border-blue-500/50 shadow-lg"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <div
                  className={`h-32 rounded-lg mb-4 bg-linear-to-br ${project.gradient} opacity-80`}
                />
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {project.shortDesc}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Panel - Fixed Details */}
          <div className="hidden lg:col-span-7 lg:block h-full sticky top-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 h-full flex flex-col"
              >
                <div
                  className={`w-full h-64 rounded-xl mb-8 bg-linear-to-br ${selectedProject.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/20">
                    Project Preview
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/30">
                    {selectedProject.category}
                  </span>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-1">Problem</h4>
                      <p className="text-sm text-white">
                        {selectedProject.fullDesc.problem}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-1">Solution</h4>
                      <p className="text-sm text-white">
                        {selectedProject.fullDesc.solution}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-1">Impact</h4>
                      <p className="text-sm text-white">
                        {selectedProject.fullDesc.impact}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <CheckCircle2 size={16} className="text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                  <a
                    href={selectedProject.links.demo}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  <a
                    href={selectedProject.links.github}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github size={18} /> GitHub Repo
                  </a>
                  <a
                    href={selectedProject.links.caseStudy}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText size={18} /> Case Study
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
