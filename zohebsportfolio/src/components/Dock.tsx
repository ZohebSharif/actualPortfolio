import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

interface DockProps {
  onOpenFinder: () => void;
  finderOpen: boolean;
}

const Dock: React.FC<DockProps> = ({ onOpenFinder, finderOpen }) => {
  const appItems = [
    {
      name: 'Finder',
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#36a3f7] to-[#1a73e8] flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="2" width="18" height="20" rx="2" fill="white" fillOpacity={0.9} />
            <path d="M7 6h4" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 9h10" stroke="#ccc" strokeWidth="1" strokeLinecap="round" />
            <path d="M7 11.5h10" stroke="#ccc" strokeWidth="1" strokeLinecap="round" />
            <path d="M7 14h7" stroke="#ccc" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      ),
      onClick: onOpenFinder,
      active: finderOpen,
    },
  ];

  const externalItems = [
    {
      name: 'GitHub',
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#333] to-[#1a1a1a] flex items-center justify-center">
          <Github size={24} className="text-white" />
        </div>
      ),
      href: 'https://github.com/zohebsharif/',
    },
    {
      name: 'LinkedIn',
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#0077b5] to-[#005e93] flex items-center justify-center">
          <Linkedin size={24} className="text-white" />
        </div>
      ),
      href: 'https://www.linkedin.com/in/zohebsharif/',
    },
    {
      name: 'Email',
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#34c759] to-[#248a3d] flex items-center justify-center">
          <Mail size={24} className="text-white" />
        </div>
      ),
      href: 'mailto:sharifzoheb@gmail.com',
    },
    {
      name: 'Resume',
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#ff9500] to-[#c77700] flex items-center justify-center">
          <FileText size={24} className="text-white" />
        </div>
      ),
      href: '/resume.pdf',
    },
  ];

  return (
    <div className="macos-dock">
      {appItems.map((item) => (
        <div key={item.name} className="dock-item" onClick={item.onClick}>
          <div className="dock-tooltip">{item.name}</div>
          <div className="dock-item-icon">{item.icon}</div>
          {item.active && <div className="dock-indicator" />}
        </div>
      ))}

      <div className="dock-separator" />

      {externalItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target={item.href.startsWith('mailto:') || item.href.startsWith('/') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="dock-item"
        >
          <div className="dock-tooltip">{item.name}</div>
          <div className="dock-item-icon">{item.icon}</div>
        </a>
      ))}
    </div>
  );
};

export default Dock;
