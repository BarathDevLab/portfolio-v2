"use client";
import React, { useEffect, useRef } from "react";

function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to full window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Variables for particles
    type Particle = {
      x: number;
      y: number;
      size: number;
      alpha: number;
    };
    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0 };

    // Options (customizable)
    const options = {
      trailEffect: "glow",
      particleCount: 15,
      particleSize: 10,
      particleColor: "#3b82f6",
      fadeSpeed: 0.95,
    };

    // Update mouse position on move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Add new particle
      particles.push({
        x: mouse.x,
        y: mouse.y,
        size: options.particleSize,
        alpha: 1,
      });

      // Keep particles array at desired length
      if (particles.length > options.particleCount) {
        particles.splice(0, particles.length - options.particleCount);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle, index) => {
        if (options.trailEffect === "dots") {
          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.size * particle.alpha,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `${options.particleColor}${Math.floor(
            particle.alpha * 255
          )
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();
        } else if (options.trailEffect === "line") {
          if (index > 0) {
            const prevParticle = particles[index - 1];
            ctx.beginPath();
            ctx.moveTo(prevParticle.x, prevParticle.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.strokeStyle = `${options.particleColor}${Math.floor(
              particle.alpha * 255
            )
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = particle.size * particle.alpha;
            ctx.stroke();
          }
        } else if (options.trailEffect === "glow") {
          ctx.beginPath();
          const grd = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 2 * particle.alpha
          );
          grd.addColorStop(
            0,
            `${options.particleColor}${Math.floor(particle.alpha * 255)
              .toString(16)
              .padStart(2, "0")}`
          );
          grd.addColorStop(1, `${options.particleColor}00`);
          ctx.fillStyle = grd;
          ctx.arc(
            particle.x,
            particle.y,
            particle.size * 2 * particle.alpha,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Update alpha
        particle.alpha *= options.fadeSpeed;
      });

      // Remove faded particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].alpha < 0.01) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []); // Empty dependency array for one-time setup

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default CursorTrail;
