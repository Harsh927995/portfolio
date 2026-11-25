import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { DEVELOPER_PROFILE, CORE_DEPENDENCIES, PROJECTS, CODE_SNIPPETS } from '../data/portfolioData';
import { THEMES, ThemeId, isValidThemeId } from '../data/themes';
import { TerminalOutputLine } from '../types';

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  theme: ThemeId;
  onChangeTheme: (theme: ThemeId) => void;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  theme,
  onChangeTheme,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalOutputLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'DEV_CORE Kernel v4.19.0-x86_64 initialized. Type "help" for available commands.',
    },
    {
      id: 'init-2',
      type: 'output',
      text: `Host: Global Edge Node | User: guest@devcore-shell | Status: ${DEVELOPER_PROFILE.status}`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const userLine: TerminalOutputLine = {
      id: `cmd-${Date.now()}`,
      type: 'input',
      text: `guest@devcore:~$ ${trimmed}`,
    };

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let responses: TerminalOutputLine[] = [];

    switch (mainCmd) {
      case 'help':
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'output',
            text: `Available DEV_CORE Commands:
  • help           - Display this operational handbook
  • skills         - Print core technologies & engineering dependencies
  • projects       - List all architectural deployments
  • bio            - Display developer profile & architectural focus
  • ping           - Probe edge node latency & system health
  • cat <file>     - Print source files (${Object.keys(CODE_SNIPPETS).join(', ')})
  • theme [name]   - Inspect or switch color theme (${THEMES.map((t) => t.id).join(', ')})
  • resume         - Open full developer resume document
  • contact        - Print transmission coordinates
  • clear          - Flush terminal buffer
  • sudo hire      - Trigger direct VIP priority recruitment flow`,
          },
        ];
        break;

      case 'skills':
      case 'stack':
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'output',
            text: `[CORE STACK MATRIX]\n${CORE_DEPENDENCIES.map((d) => `  [+] ${d}`).join('\n')}`,
          },
        ];
        break;

      case 'projects':
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'output',
            text: PROJECTS.map(
              (p, i) => `[${i + 1}] ${p.title} (${p.category.toUpperCase()})
    -> ${p.summary}
    -> Stack: ${p.techStack.join(', ')}`
            ).join('\n\n'),
          },
        ];
        break;

      case 'bio':
      case 'whoami':
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'output',
            text: `Name: ${DEVELOPER_PROFILE.name}
Role: ${DEVELOPER_PROFILE.title}
Sub-title: ${DEVELOPER_PROFILE.subtitle}
Location: ${DEVELOPER_PROFILE.location}
Bio: ${DEVELOPER_PROFILE.heroBio}`,
          },
        ];
        break;

      case 'ping':
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'success',
            text: `PING global-edge.devcore.systems: 64 bytes
icmp_seq=1 ttl=118 time=14.3 ms
icmp_seq=2 ttl=118 time=13.8 ms
icmp_seq=3 ttl=118 time=14.1 ms
--- global-edge statistics ---
3 packets transmitted, 3 received, 0% packet loss, avg = 14.06ms`,
          },
        ];
        break;

      case 'cat': {
        const file = args[0];
        const snippet = file ? CODE_SNIPPETS[file] : undefined;
        if (snippet) {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'output',
              text: snippet.code,
            },
          ];
        } else {
          const availableFiles = Object.keys(CODE_SNIPPETS)
            .map((name) => `"cat ${name}"`)
            .join(', ');
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'error',
              text: `cat: ${file || 'null'}: No such file. Try ${availableFiles}.`,
            },
          ];
        }
        break;
      }

      case 'theme': {
        const target = args[0]?.toLowerCase();
        if (!target) {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'output',
              text: `Active theme: ${theme}\nAvailable themes:\n${THEMES.map(
                (t) => `  • ${t.id.padEnd(16)} (${t.name}: ${t.primary} / ${t.secondary})`
              ).join('\n')}\nUsage: theme <id>`,
            },
          ];
        } else if (isValidThemeId(target)) {
          onChangeTheme(target);
          const chosen = THEMES.find((t) => t.id === target);
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'success',
              text: `Theme switched to "${chosen?.name || target}" (${chosen?.primary} / ${chosen?.secondary}).`,
            },
          ];
        } else {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'error',
              text: `Unknown theme "${target}". Available: ${THEMES.map((t) => t.id).join(', ')}`,
            },
          ];
        }
        break;
      }

      case 'resume':
        onOpenResume();
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'success',
            text: 'Opening formatted resume viewer...',
          },
        ];
        break;

      case 'contact':
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'output',
            text: `Email: ${DEVELOPER_PROFILE.email}
GitHub: ${DEVELOPER_PROFILE.github}
LinkedIn: ${DEVELOPER_PROFILE.linkedin}
Location: ${DEVELOPER_PROFILE.location}`,
          },
        ];
        break;

      case 'sudo':
        if (args[0] === 'hire') {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'success',
              text: `[ROOT ACCESS GRANTED] Direct VIP Line Initialized!
Email transmission sent to ${DEVELOPER_PROFILE.email} with priority flag set to HIGHEST.`,
            },
          ];
        } else {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'error',
              text: `sudo: ${args.join(' ')}: permission denied. Try "sudo hire".`,
            },
          ];
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responses = [
          {
            id: `res-${Date.now()}-1`,
            type: 'error',
            text: `command not found: ${trimmed}. Type "help" for a list of valid commands.`,
          },
        ];
        break;
    }

    setHistory((prev) => [...prev, userLine, ...responses]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive CLI Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        className={`w-full ${
          isMaximized ? 'max-w-6xl h-[85vh]' : 'max-w-3xl h-[520px]'
        } surface-glass rounded-xl overflow-hidden flex flex-col border border-accent/40 shadow-[0_0_35px_rgb(var(--theme-primary-rgb)/0.25)] transition-all duration-300`}
      >
        {/* Terminal Header */}
        <div className="bg-surface-lowest px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="mac-controls">
              <button
                onClick={onClose}
                aria-label="Close terminal"
                className="mac-close cursor-pointer"
                title="Close terminal"
              />
              <button
                onClick={() => setHistory([])}
                aria-label="Clear terminal screen"
                className="mac-min cursor-pointer"
                title="Clear screen"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                aria-label="Toggle fullscreen terminal"
                className="mac-max cursor-pointer"
                title="Toggle fullscreen"
              />
            </div>
            <span className="font-mono text-xs text-[#b9cacb] ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-accent" />
              <span>guest@devcore: ~ (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label={isMaximized ? 'Restore terminal size' : 'Maximize terminal'}
              className="text-[#b9cacb] hover:text-accent p-1 cursor-pointer"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close terminal"
              className="text-[#b9cacb] hover:text-[#e1fdff] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          className="flex-grow bg-surface-lowest p-4 font-mono text-xs sm:text-sm text-[#b9cacb] overflow-y-auto space-y-2 select-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line) => {
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-accent font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-[#ffb4ab]">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-accent font-bold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-accent-secondary italic opacity-80">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-[#e2e2e2] whitespace-pre-wrap leading-relaxed">
                {line.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Bar */}
        <div className="bg-surface px-4 py-3 border-t border-white/10 flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-accent font-bold shrink-0">
            guest@devcore:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'projects', 'cat passion.js'..."
            className="flex-grow bg-transparent text-xs sm:text-sm font-mono text-[#e1fdff] outline-none placeholder-[#b9cacb]/30"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            aria-label="Execute command"
            className="p-1 rounded text-accent hover:bg-white/5 cursor-pointer"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
