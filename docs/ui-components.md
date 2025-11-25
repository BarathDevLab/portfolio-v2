
# scrollings animations 

# RNO1 Website Analysis & Recreation Guide

## 1. Analysis of RNO1.com

The RNO1 website is a high-end digital agency portfolio characterized by:
- **Smooth, Inertia-based Scrolling:** The page flows fluidly, unlike default browser scrolling.
- **Scroll-Triggered Animations:** Elements fade in, slide up, or scale as they enter the viewport.
- **Parallax Effects:** Images and text move at different speeds relative to the scroll position.
- **Micro-interactions:** Hover states on buttons and cards are highly reactive.
- **Typography-led Design:** Large, bold typography that often animates (e.g., line-by-line reveals).

### Likely Tech Stack
To recreate this level of polish, the following modern stack is recommended:

*   **Framework:** [Next.js](https://nextjs.org/) (React) - For performance, routing, and SEO.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For rapid, utility-first styling.
*   **Animation Engine:** [GSAP (GreenSock Animation Platform)](https://gsap.com/) - The industry standard for complex web animations.
    *   **Plugin:** `ScrollTrigger` - Essential for scroll-based effects.
    *   **Plugin:** `SplitText` (Premium) or custom CSS/JS for text reveals.
*   **Smooth Scrolling:**  - A modern, lightweight smooth scroll library that integrates perfectly with GSAP.

---

## 2. Recreation Guide

### Step 1: Project Setup

Initialize a new Next.js project with Tailwind CSS.

```bash
npx create-next-app@latest rno1-clone --typescript --tailwind --eslint
cd rno1-clone
```

### Step 2: Install Dependencies

Install the necessary animation and scrolling libraries.

```bash
npm install gsap @studio-freight/react-lenis
```
*(Note: `@studio-freight/react-lenis` is the React wrapper for Lenis)*

### Step 3: Implement Smooth Scrolling (Lenis)

Wrap your application in a Lenis provider to enable smooth scrolling globally.

**`app/layout.tsx`**
```tsx
'use client'
import { ReactLenis } from '@studio-freight/react-lenis'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
```

### Step 4: Create Scroll Animations (GSAP)

Create a reusable hook or component for scroll animations.

**`hooks/useScrollAnimation.ts`**
```ts
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Animation starts when top of element hits 80% of viewport height
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [ref]);
};
```

### Step 5: Implement Parallax Sections

For the "floating" image effects seen on RNO1.

**`components/ParallaxImage.tsx`**
```tsx
'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ParallaxImage({ src, alt }: { src: string, alt: string }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(imageRef.current, {
      yPercent: 20, // Move image down 20% as we scroll
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true, // Link animation progress directly to scrollbar
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden h-[500px] w-full relative">
      <img 
        ref={imageRef} 
        src={src} 
        alt={alt} 
        className="w-full h-[120%] object-cover -mt-[10%]" // Make image taller than container
      />
    </div>
  );
}
```

### Step 6: Typography & Layout

Use Tailwind to match the bold, minimal aesthetic.

```tsx
<h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none">
  Radical<br />Digital<br />Experiences
</h1>
```

## 3. Summary of Modules to Use

| Module | Purpose | Command |
| :--- | :--- | :--- |
| **Next.js** | Core Framework | `npx create-next-app@latest` |
| **Tailwind CSS** | Styling | (Included in create-next-app) |
| **GSAP** | Complex Animations | `npm install gsap` |
| **Lenis** | Smooth Scrolling | `npm install @studio-freight/react-lenis` |
| **Lucide React** | Icons (Optional) | `npm install lucide-react` |




document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



{
    {scrooling animation : npx shadcn@latest add @react-bits/ScrollAnimation-JS-CSS
    {
        import { useScrollAnimation } from './useScrollAnimation';
}

{
    npx shadcn@latest add @react-bits/BlurText-TS-TW
    {
        import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

<BlurText
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>
    }
    {
        import { motion, Transition, Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity'
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

    export default BlurText;

    }

" this is text animation for the portfulio website "
}

{curser traill effects " 
import React, { useEffect, useRef } from 'react';

function CursorTrail() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to full window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Variables for particles
    const particles = [];
    const mouse = { x: 0, y: 0 };
    
    // Options (customizable)
    const options = {
      trailEffect: 'glow',
      particleCount: 15,
      particleSize: 10,
      particleColor: '#3b82f6',
      fadeSpeed: 0.95
    };
    
    // Update mouse position on move
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Add new particle
      particles.push({
        x: mouse.x,
        y: mouse.y,
        size: options.particleSize,
        alpha: 1
      });
      
      // Keep particles array at desired length
      if (particles.length > options.particleCount) {
        particles.splice(0, particles.length - options.particleCount);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach((particle, index) => {
        if (options.trailEffect === 'dots') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.alpha, 0, Math.PI * 2);
          ctx.fillStyle = `${options.particleColor}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        } else if (options.trailEffect === 'line') {
          if (index > 0) {
            const prevParticle = particles[index - 1];
            ctx.beginPath();
            ctx.moveTo(prevParticle.x, prevParticle.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.strokeStyle = `${options.particleColor}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = particle.size * particle.alpha;
            ctx.stroke();
          }
        } else if (options.trailEffect === 'glow') {
          ctx.beginPath();
          const grd = ctx.createRadialGradient(
            particle.x, particle.y, 0, 
            particle.x, particle.y, particle.size * 2 * particle.alpha
          );
          grd.addColorStop(0, `${options.particleColor}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`);
          grd.addColorStop(1, `${options.particleColor}00`);
          ctx.fillStyle = grd;
          ctx.arc(particle.x, particle.y, particle.size * 2 * particle.alpha, 0, Math.PI * 2);
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []); // Empty dependency array for one-time setup
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}

export default CursorTrail;

// Usage example:
// Add the <CursorTrail /> component to your App or Layout component
    
    }
{
" this is curser trail effect for the portfulio website "
}
"npx shadcn@latest mcp init --client vscode"



## navbar 

