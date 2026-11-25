import React, { useEffect, useRef, useState } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="link"], input, textarea, select, label, .cursor-pointer';

export const CyberCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const pointerPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateEnabled = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };

    updateEnabled();
    finePointer.addEventListener('change', updateEnabled);
    reducedMotion.addEventListener('change', updateEnabled);

    return () => {
      finePointer.removeEventListener('change', updateEnabled);
      reducedMotion.removeEventListener('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('cyber-cursor-active');
      return;
    }

    document.documentElement.classList.add('cyber-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      pointerPos.current = { x: e.clientX, y: e.clientY };

      if (!hasMoved.current) {
        ringPos.current = { x: e.clientX, y: e.clientY };
        glowPos.current = { x: e.clientX, y: e.clientY };
        hasMoved.current = true;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(INTERACTIVE_SELECTOR) ?? null;
      const textTarget = target?.closest('input, textarea, [contenteditable="true"]') ?? null;

      setIsHovering(Boolean(interactive));
      setIsTextInput(Boolean(textTarget));
      setVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 550);
    };

    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => {
      setVisible(false);
      setIsPressed(false);
    };
    const handleMouseEnter = () => setVisible(true);

    const animate = () => {
      ringPos.current.x += (pointerPos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pointerPos.current.y - ringPos.current.y) * 0.18;

      glowPos.current.x += (pointerPos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (pointerPos.current.y - glowPos.current.y) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('cyber-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`no-print pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Soft ambient cyber glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -ml-24 -mt-24 w-48 h-48 rounded-full bg-accent/[0.07] blur-2xl will-change-transform"
      />

      {/* Trailing cyber ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out ${
            isPressed
              ? 'w-7 h-7 border-accent bg-accent/15 shadow-[0_0_20px_rgb(var(--theme-primary-rgb)/0.65)] scale-90'
              : isHovering && !isTextInput
                ? 'w-11 h-11 border-accent-secondary bg-accent-secondary/10 shadow-[0_0_22px_rgb(var(--theme-secondary-rgb)/0.55)]'
                : isTextInput
                  ? 'w-6 h-6 border-accent/50 opacity-50'
                  : 'w-9 h-9 border-accent/60 shadow-[0_0_14px_rgb(var(--theme-primary-rgb)/0.28)]'
          }`}
        />
      </div>

      {/* Precision core dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 will-change-transform transition-opacity duration-150 ${
          isTextInput ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150 ${
            isPressed
              ? 'w-2.5 h-2.5 bg-accent-secondary shadow-[0_0_14px_var(--theme-secondary)] scale-125'
              : isHovering
                ? 'w-2 h-2 bg-accent-secondary shadow-[0_0_12px_var(--theme-secondary)]'
                : 'w-2 h-2 bg-accent shadow-[0_0_10px_var(--theme-primary)]'
          }`}
        />
      </div>

      {/* Click pulse ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{ left: ripple.x, top: ripple.y }}
          className="fixed w-8 h-8 rounded-full border border-accent/80 animate-cyber-ripple"
        />
      ))}
    </div>
  );
};
