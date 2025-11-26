"use client";
import React, { useRef } from "react";
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-[#0a0a0f] min-h-screen"
    >
      <div className="max-w-7xl mx-auto space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Visual Side (Image) */}
            <div
              className={`relative aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br ${project.gradient} p-8 md:p-12 group`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Mock Browser/App Window */}
              <div className="w-full h-full bg-[#0f0f14] rounded-xl shadow-2xl overflow-hidden border border-white/10 relative transform group-hover:scale-[1.02] transition-transform duration-500">
                {/* Header Bar */}
                <div className="h-8 bg-[#1a1a20] border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>

                {/* Image Placeholder */}
                <div className="relative w-full h-full bg-[#0a0a0f] flex items-center justify-center group-hover:bg-[#0f0f14] transition-colors">
                  {/* If you have actual images, use Next.js Image here. For now, text/icon placeholder */}
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-bold text-white/20 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/10 text-sm">Project Screenshot</p>
                  </div>
                  {/* Overlay Content similar to reference image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                      <p className="text-white font-medium">
                        {project.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`h-px w-12 bg-linear-to-r ${project.gradient}`}
                  />
                  <span
                    className={`text-lg font-medium bg-clip-text text-transparent bg-linear-to-r ${project.gradient}`}
                  >
                    {project.category}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.fullDesc.solution} {project.fullDesc.impact}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-linear-to-r ${project.gradient}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    {/* Simple dot for tech icon placeholder */}
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <Github size={18} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
