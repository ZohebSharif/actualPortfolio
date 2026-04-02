import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, GraduationCap, BarChart3, Sparkles } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  icon: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    title: 'Research Software Engineering Intern',
    company: 'Lawrence Berkeley National Labs',
    location: 'Berkeley, CA',
    duration: 'June 2025 — Present',
    description: [
      'Architected interactive scientific visualization web app using React for complex beamline data',
      'Engineered high-performance data visualization components for large scientific datasets',
      'Collaborated with leading scientists to translate requirements into intuitive interfaces',
    ],
    icon: <Microscope size={16} />,
  },
  {
    title: 'Leader Teaching Assistant (CS)',
    company: 'The Stem Lab — CSU East Bay',
    location: 'Hayward, CA',
    duration: 'August 2024 — Present',
    description: [
      'Improved student performance by 45% through tailored educational strategies',
      'Mentored and led a team of learning assistants with best practices',
      'Created teaching resources for Data Structures and Software Engineering courses',
    ],
    icon: <GraduationCap size={16} />,
  },
  {
    title: 'Student Researcher Intern',
    company: 'MESA',
    location: 'Hayward, CA',
    duration: 'June 2024 — October 2024',
    description: [
      'Conducted statistical analysis using R with linear regression models',
      'Implemented data validation techniques improving research reliability',
      'Delivered research presentation communicating complex statistical concepts',
    ],
    icon: <BarChart3 size={16} />,
  },
  {
    title: 'Augmented Reality Intern',
    company: 'Snap Inc.',
    location: 'Remote',
    duration: 'March 2024 — April 2024',
    description: [
      "Mastered Snap's proprietary AR development tools",
      'Designed immersive AR experiences blending digital with physical world',
      'Collaborated with creative teams on interactive 2D/3D AR encounters',
    ],
    icon: <Sparkles size={16} />,
  },
];

const FinderExperience = () => {
  return (
    <div className="max-w-3xl">
      <div className="space-y-1">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="timeline-item"
          >
            <div className="timeline-dot" />
            <div
              className="p-4 rounded-xl transition-colors"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span style={{ color: '#007aff' }}>{exp.icon}</span>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {exp.duration}
                </span>
              </div>
              <h3 className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
                {exp.title}
              </h3>
              <p className="text-sm mb-2" style={{ color: '#007aff' }}>
                {exp.company}{' '}
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>· {exp.location}</span>
              </p>
              <ul className="space-y-1">
                {exp.description.map((point, i) => (
                  <li
                    key={i}
                    className="text-xs flex items-start gap-2"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    <span style={{ color: '#007aff', marginTop: 2 }}>▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinderExperience;
