"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

const ProjectImage = ({
  project,
  setActiveProject,
}: {
  project: Project;
  setActiveProject: (p: Project) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveProject(project);
    }
  }, [isInView, project, setActiveProject]);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center p-8">
      <div
        className={`relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden bg-linear-to-br ${project.gradient} p-1 group transition-all duration-500`}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        <div className="w-full h-full bg-[#0f0f14] rounded-2xl overflow-hidden relative">
          {/* Image Placeholder - Replace with Next.js Image */}
          <div className="relative w-full h-full bg-[#0a0a0f] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
            <div className="text-center p-6">
              <h3 className="text-3xl font-bold text-white/20 mb-2">
                {project.title}
              </h3>
              <p className="text-white/10 text-lg">High Quality Image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#0a0a0f] min-h-screen"
    >
      <div className="pt-20 pb-10 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Featured <span className="text-blue-500">Projects</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of my recent work in web and mobile development.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Scrollable Images */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectImage
              key={project.id}
              project={project}
              setActiveProject={setActiveProject}
            />
          ))}
        </div>

        {/* Right Column: Sticky Content */}
        <div className="hidden lg:flex h-screen sticky top-0 items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 w-full max-w-lg"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`h-px w-12 bg-linear-to-r ${activeProject.gradient}`}
                  />
                  <span
                    className={`text-lg font-medium bg-clip-text text-transparent bg-linear-to-r ${activeProject.gradient}`}
                  >
                    {activeProject.category}
                  </span>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                  {activeProject.title}
                </h2>
                <p className="text-gray-400 text-xl leading-relaxed">
                  {activeProject.fullDesc.solution}{" "}
                  {activeProject.fullDesc.impact}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4">
                {activeProject.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-lg"
                  >
                    <CheckCircle2
                      className={`text-${
                        activeProject.gradient.split("-")[1]
                      }-500`}
                      size={20}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 pt-4">
                {activeProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-8">
                {activeProject.links.demo && (
                  <a
                    href={activeProject.links.demo}
                    className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={20} /> Live Demo
                  </a>
                )}
                {activeProject.links.github && (
                  <a
                    href={activeProject.links.github}
                    className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <Github size={20} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
