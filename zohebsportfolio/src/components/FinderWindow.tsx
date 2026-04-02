import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Menu,
  X,
} from 'lucide-react';
import FinderAbout from './FinderAbout';
import FinderProjects from './FinderProjects';
import FinderExperience from './FinderExperience';
import FinderAwards from './FinderAwards';
import FinderContact from './FinderContact';
import FinderResume from './FinderResume';

export type FinderSection = 'about' | 'projects' | 'experience' | 'awards' | 'contact' | 'resume';

interface FinderWindowProps {
  onClose: () => void;
}

// macOS-style blue folder icon
const FolderIcon = ({ color = '#3b9ff5' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M1.5 3.5C1.5 2.67 2.17 2 3 2H6L7.5 3.5H13C13.83 3.5 14.5 4.17 14.5 5V12C14.5 12.83 13.83 13.5 13 13.5H3C2.17 13.5 1.5 12.83 1.5 12V3.5Z"
      fill={color}
    />
    <path
      d="M1.5 5.5H14.5V12C14.5 12.83 13.83 13.5 13 13.5H3C2.17 13.5 1.5 12.83 1.5 12V5.5Z"
      fill={color}
      fillOpacity="0.85"
    />
  </svg>
);

// macOS sidebar icon for the user (like AirDrop icon style)
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="3" fill="#5ac8fa" />
    <path d="M2.5 14C2.5 11 4.5 9 8 9C11.5 9 13.5 11 13.5 14" stroke="#5ac8fa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" fill="#34c759" />
    <path d="M1.5 4.5L8 9L14.5 4.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="1" width="10" height="14" rx="1.5" fill="#ff9500" />
    <path d="M5.5 5H10.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M5.5 7.5H10.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M5.5 10H8.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 2H11V7C11 9.21 9.66 11 8 11C6.34 11 5 9.21 5 7V2Z" fill="#ffcc00" />
    <path d="M3 3H5V5.5C4.17 5.5 3 4.83 3 3.5V3Z" fill="#ffcc00" fillOpacity="0.7" />
    <path d="M11 3H13V3.5C13 4.83 11.83 5.5 11 5.5V3Z" fill="#ffcc00" fillOpacity="0.7" />
    <rect x="7" y="11" width="2" height="2" fill="#ffcc00" />
    <rect x="5.5" y="13" width="5" height="1.5" rx="0.5" fill="#ffcc00" />
  </svg>
);

const sidebarItems: { id: FinderSection; label: string; icon: React.ReactNode }[] = [
  { id: 'about', label: 'About Me', icon: <UserIcon /> },
  { id: 'projects', label: 'Projects', icon: <FolderIcon color="#3b9ff5" /> },
  { id: 'experience', label: 'Experience', icon: <FolderIcon color="#5856d6" /> },
  { id: 'awards', label: 'Awards', icon: <TrophyIcon /> },
  { id: 'contact', label: 'Contact', icon: <MailIcon /> },
  { id: 'resume', label: 'Resume', icon: <DocIcon /> },
];

const sectionTitles: Record<FinderSection, string> = {
  about: 'About Me',
  projects: 'Projects',
  experience: 'Work Experience',
  awards: 'Hackathon Awards',
  contact: 'Get In Touch',
  resume: 'Resume',
};

const FinderWindow: React.FC<FinderWindowProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<FinderSection>('about');
  const [history, setHistory] = useState<FinderSection[]>(['about']);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (section: FinderSection) => {
    const newHistory = [...history.slice(0, historyIdx + 1), section];
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    setActiveSection(section);
  };

  const goBack = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setActiveSection(history[historyIdx - 1]);
    }
  };

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setActiveSection(history[historyIdx + 1]);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about': return <FinderAbout />;
      case 'projects': return <FinderProjects />;
      case 'experience': return <FinderExperience />;
      case 'awards': return <FinderAwards />;
      case 'contact': return <FinderContact />;
      case 'resume': return <FinderResume />;
      default: return <FinderAbout />;
    }
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="macos-window flex flex-col"
        style={{
          width: 'min(1100px, calc(100vw - 16px))',
          height: 'calc(100vh - 56px)',
        }}
      >
        {/* Title Bar — authentic macOS Finder */}
        <div className="macos-titlebar flex-shrink-0">
          {/* Traffic lights */}
          <div className="traffic-lights">
            <button className="traffic-light traffic-light-red" onClick={onClose} />
            <button className="traffic-light traffic-light-yellow" />
            <button className="traffic-light traffic-light-green" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 ml-3 rounded transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          {/* Navigation arrows */}
          <div className="flex items-center gap-1 ml-2 md:ml-4">
            <button
              onClick={goBack}
              disabled={historyIdx <= 0}
              className="p-1 rounded transition-colors"
              style={{
                color: historyIdx > 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goForward}
              disabled={historyIdx >= history.length - 1}
              className="p-1 rounded transition-colors"
              style={{
                color: historyIdx < history.length - 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Window title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {sectionTitles[activeSection]}
            </span>
          </div>

          {/* Right toolbar: view options + search (hidden on mobile) */}
          <div className="ml-auto hidden md:flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <button className="p-1 rounded" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <LayoutGrid size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
              </button>
              <button className="p-1 rounded">
                <List size={12} style={{ color: 'rgba(255,255,255,0.35)' }} />
              </button>
            </div>

            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Search size={11} style={{ color: 'rgba(255,255,255,0.35)' }} />
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Search</span>
            </div>
          </div>
        </div>

        {/* Body: Sidebar + Content */}
        <div className="flex flex-1 min-h-0 relative">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="md:hidden absolute inset-0 z-10"
              onClick={() => setSidebarOpen(false)}
              style={{ background: 'rgba(0,0,0,0.5)' }}
            />
          )}
          {sidebarOpen && (
            <div className="md:hidden absolute top-0 left-0 bottom-0 z-20 finder-sidebar flex-shrink-0 overflow-y-auto">
              <div className="finder-sidebar-section mt-1">Favorites</div>
              {sidebarItems.map((item) => (
                <div
                  key={item.id}
                  className={`finder-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => { navigate(item.id); setSidebarOpen(false); }}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}

              <div className="finder-sidebar-section mt-4">Links</div>
              <a
                href="https://github.com/zohebsharif/"
                target="_blank"
                rel="noopener noreferrer"
                className="finder-sidebar-item"
                onClick={() => setSidebarOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" fill="#6e6e73" />
                  <path d="M8 3C5.24 3 3 5.24 3 8C3 10.22 4.47 12.09 6.47 12.71C6.72 12.76 6.81 12.6 6.81 12.47V11.53C5.35 11.84 5.06 10.97 5.06 10.97C4.83 10.42 4.5 10.27 4.5 10.27C4.06 9.97 4.54 9.97 4.54 9.97C5.03 10.01 5.29 10.48 5.29 10.48C5.73 11.22 6.44 11.01 6.82 10.88C6.87 10.56 7 10.34 7.15 10.22C6.03 10.09 4.85 9.63 4.85 7.72C4.85 7.2 5.04 6.78 5.3 6.44C5.25 6.32 5.07 5.84 5.35 5.2C5.35 5.2 5.76 5.07 6.81 5.66C7.19 5.56 7.6 5.51 8 5.51C8.4 5.51 8.81 5.56 9.19 5.66C10.24 5.07 10.65 5.2 10.65 5.2C10.93 5.84 10.75 6.32 10.7 6.44C10.96 6.78 11.15 7.2 11.15 7.72C11.15 9.64 9.97 10.09 8.84 10.21C9.03 10.37 9.2 10.68 9.2 11.15V12.47C9.2 12.61 9.29 12.77 9.54 12.71C11.53 12.09 13 10.22 13 8C13 5.24 10.76 3 8 3Z" fill="white" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zohebsharif/"
                target="_blank"
                rel="noopener noreferrer"
                className="finder-sidebar-item"
                onClick={() => setSidebarOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="#0077b5" />
                  <path d="M4.5 6.5V11.5M4.5 4.5V4.51M7 11.5V8.5C7 7.5 7.75 6.75 8.5 6.75C9.25 6.75 10 7.5 10 8.5V11.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                LinkedIn
              </a>
            </div>
          )}

          {/* Desktop sidebar */}
          <div className="hidden md:block finder-sidebar flex-shrink-0 overflow-y-auto">
            <div className="finder-sidebar-section mt-1">Favorites</div>
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                className={`finder-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
              >
                {item.icon}
                {item.label}
              </div>
            ))}

            <div className="finder-sidebar-section mt-4">Links</div>
            <a
              href="https://github.com/zohebsharif/"
              target="_blank"
              rel="noopener noreferrer"
              className="finder-sidebar-item"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" fill="#6e6e73" />
                <path d="M8 3C5.24 3 3 5.24 3 8C3 10.22 4.47 12.09 6.47 12.71C6.72 12.76 6.81 12.6 6.81 12.47V11.53C5.35 11.84 5.06 10.97 5.06 10.97C4.83 10.42 4.5 10.27 4.5 10.27C4.06 9.97 4.54 9.97 4.54 9.97C5.03 10.01 5.29 10.48 5.29 10.48C5.73 11.22 6.44 11.01 6.82 10.88C6.87 10.56 7 10.34 7.15 10.22C6.03 10.09 4.85 9.63 4.85 7.72C4.85 7.2 5.04 6.78 5.3 6.44C5.25 6.32 5.07 5.84 5.35 5.2C5.35 5.2 5.76 5.07 6.81 5.66C7.19 5.56 7.6 5.51 8 5.51C8.4 5.51 8.81 5.56 9.19 5.66C10.24 5.07 10.65 5.2 10.65 5.2C10.93 5.84 10.75 6.32 10.7 6.44C10.96 6.78 11.15 7.2 11.15 7.72C11.15 9.64 9.97 10.09 8.84 10.21C9.03 10.37 9.2 10.68 9.2 11.15V12.47C9.2 12.61 9.29 12.77 9.54 12.71C11.53 12.09 13 10.22 13 8C13 5.24 10.76 3 8 3Z" fill="white" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/zohebsharif/"
              target="_blank"
              rel="noopener noreferrer"
              className="finder-sidebar-item"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="#0077b5" />
                <path d="M4.5 6.5V11.5M4.5 4.5V4.51M7 11.5V8.5C7 7.5 7.75 6.75 8.5 6.75C9.25 6.75 10 7.5 10 8.5V11.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Content Area */}
          <div className="finder-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Status bar at bottom like Finder */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-4 py-1.5 text-[11px]"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.35)',
            background: 'rgba(30,30,30,0.3)',
          }}
        >
          <span>
            {activeSection === 'projects'
              ? '9 items'
              : activeSection === 'experience'
              ? '4 items'
              : activeSection === 'awards'
              ? '3 items'
              : ''}
          </span>
          <span>Zoheb's Portfolio</span>
        </div>
      </motion.div>
    </div>
  );
};

export default FinderWindow;
