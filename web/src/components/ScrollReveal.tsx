"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "scale-up"
  | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number; // en milisegundos
  duration?: number; // en milisegundos
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  rootMargin = "-30px 0px",
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Activa al entrar y desactiva al salir para que al subir y bajar se vuelva a animar
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, rootMargin]);

  // Estilos iniciales (fuera de vista)
  const getInitialStyle = (): string => {
    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-12 scale-[0.97] blur-[1px]";
      case "fade-down":
        return "opacity-0 -translate-y-12 scale-[0.97] blur-[1px]";
      case "fade-left":
        return "opacity-0 translate-x-12 blur-[1px]";
      case "fade-right":
        return "opacity-0 -translate-x-12 blur-[1px]";
      case "zoom-in":
        return "opacity-0 scale-90 blur-[2px]";
      case "scale-up":
        return "opacity-0 scale-95 translate-y-8";
      case "fade":
      default:
        return "opacity-0";
    }
  };

  // Estilos visibles (en vista)
  const visibleStyle = "opacity-100 translate-x-0 translate-y-0 scale-100 blur-none";

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        transitionProperty: "opacity, transform, filter",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`will-change-transform ${isVisible ? visibleStyle : getInitialStyle()} ${className}`}
    >
      {children}
    </div>
  );
}
