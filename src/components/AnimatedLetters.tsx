import React from 'react';
import { motion } from 'motion/react';

interface AnimatedLettersProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const AnimatedLetters: React.FC<AnimatedLettersProps> = ({
  text,
  className = '',
  staggerDelay = 0.028,
  initialDelay = 0.08,
}) => {
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIdx) => {
        const letters = word.split('');
        return (
          <span
            key={`${word}-${wordIdx}`}
            className="inline-block whitespace-nowrap mr-[0.28em]"
          >
            {letters.map((char, charIdx) => {
              const currentDelay = initialDelay + charCounter * staggerDelay;
              charCounter++;

              return (
                <motion.span
                  key={`${char}-${charIdx}-${currentDelay}`}
                  initial={{
                    opacity: 0,
                    y: 18,
                    filter: 'blur(4px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.45,
                    delay: currentDelay,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  whileHover={{
                    y: -5,
                    color: '#00f2ff',
                    textShadow: '0 0 16px rgba(0, 242, 255, 0.75)',
                    transition: { duration: 0.15, ease: 'easeOut' },
                  }}
                  className="inline-block transition-colors duration-150 cursor-default select-none"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};
