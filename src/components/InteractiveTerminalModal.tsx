import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { DEVELOPER_PROFILE, CORE_DEPENDENCIES, PROJECTS } from '../data/portfolioData';
import { TerminalOutputLine } from '../types';

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
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
  • cat <file>     - Print source files (passion.js, architecture.ts)
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

      case 'cat':
        const file = args[0];
        if (file === 'passion.js') {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'output',
              text: `const engineer = {
  focus: 'Scalable Systems',
  problemSolving: true,
  approach: () => {
    /* Analyze requirements, model data, build resilient APIs, craft intuitive interfaces. */
    return 'High-Impact Products';
  }
};`,
            },
          ];
        } else if (file === 'architecture.ts') {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'output',
              text: `interface SystemConfig {
  distributed: boolean;
  zeroDowntimeDeploy: boolean;
  p99LatencyMs: number;
}
export const cloudEngine: SystemConfig = {
  distributed: true,
  zeroDowntimeDeploy: true,
  p99LatencyMs: 14.2
};`,
            },
          ];
        } else {
          responses = [
            {
              id: `res-${Date.now()}-1`,
              type: 'error',
              text: `cat: ${file || 'null'}: No such file. Try "cat passion.js" or "cat architecture.ts".`,
            },
          ];
        }
        break;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`w-full ${
          isMaximized ? 'max-w-6xl h-[85vh]' : 'max-w-3xl h-[520px]'
        } surface-glass rounded-xl overflow-hidden flex flex-col border border-[#00f2ff]/40 shadow-[0_0_35px_rgba(0,242,255,0.25)] transition-all duration-300`}
      >
        {/* Terminal Header */}
        <div className="bg-[#0c0f0f] px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="mac-controls">
              <button
                onClick={onClose}
                className="mac-close cursor-pointer"
                title="Close terminal"
              />
              <button
                onClick={() => setHistory([])}
                className="mac-min cursor-pointer"
                title="Clear screen"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="mac-max cursor-pointer"
                title="Toggle fullscreen"
              />
            </div>
            <span className="font-mono text-xs text-[#b9cacb] ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>guest@devcore: ~ (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-[#b9cacb] hover:text-[#00f2ff] p-1"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-[#b9cacb] hover:text-[#e1fdff] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          className="flex-grow bg-[#0c0f0f] p-4 font-mono text-xs sm:text-sm text-[#b9cacb] overflow-y-auto space-y-2 select-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line) => {
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-[#00f2ff] font-semibold">
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
                <div key={line.id} className="text-[#00f2ff] font-bold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-[#ebb2ff] italic opacity-80">
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
        <div className="bg-[#121414] px-4 py-3 border-t border-white/10 flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-[#00f2ff] font-bold shrink-0">
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
            className="p-1 rounded text-[#00f2ff] hover:bg-white/5"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
