"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Home, User, Code, Cpu, Mail } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export interface NavbarProps {
  items?: NavItem[];
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  items = [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    { label: "About", href: "/about", icon: <User size={18} /> },
    { label: "Skills", href: "/skills", icon: <Cpu size={18} /> },
    { label: "Projects", href: "/projects", icon: <Code size={18} /> },
    { label: "Contact", href: "/contact", icon: <Mail size={18} /> },
  ],
  className = "",
}) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for initial load
    gsap.fromTo(
      navRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto flex items-center gap-2 px-2 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 ${className}`}
      >
        {items.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`relative flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 group ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {/* Active Background */}
              {isActive && (
                <span className="absolute inset-0 bg-white/10 rounded-full -z-10" />
              )}

              {/* Hover Glow */}
              <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />

              <span className="flex items-center gap-2 text-sm font-medium">
                {item.icon}
                <span className={`${isActive ? "block" : "hidden md:block"}`}>
                  {item.label}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
