import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['C/C++', 'Python', 'MIPS', 'JavaScript', 'UNIX', 'Java', 'Zig', 'TypeScript', 'R'],
  },
  {
    name: 'Frameworks',
    skills: ['React', 'Flask', 'PyTorch', 'Express.js', 'Tailwind'],
  },
  {
    name: 'Tools',
    skills: ['Github', 'Git', 'Figma', 'AWS', 'Google Cloud', 'Vite', 'Firebase', 'Supabase'],
  },
  {
    name: 'Other',
    skills: ['Agile', 'OOP', 'Web Design', 'APIs', 'Frontend Dev', 'AI', 'Machine Learning', 'Testing'],
  },
];

const FinderAbout = () => {
  return (
    <div className="max-w-3xl">
      {/* File preview area — like viewing an image in Finder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex gap-6 mb-8"
      >
        {/* Image preview — looks like a file thumbnail in Finder */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div
            className="w-36 h-44 rounded-lg overflow-hidden relative"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            <img
              src="zohebsharif.webp"
              alt="Zoheb Sharif"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Filename label like macOS Finder */}
          <div
            className="mt-2 px-3 py-0.5 rounded text-[11px] font-medium text-center"
            style={{
              background: 'rgba(0,122,255,0.35)',
              color: 'white',
              maxWidth: 140,
            }}
          >
            zoheb.jpg
          </div>
        </div>

        {/* Info panel — like Finder's "Get Info" or preview pane */}
        <div className="flex-1 pt-1">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mb-1"
            style={{ color: 'rgba(255,255,255,0.95)' }}
          >
            hi, i'm zoheb!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm font-medium mb-3"
            style={{ color: '#007aff' }}
          >
            software engineer & cs student
          </motion.p>

          {/* Info rows like macOS Get Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-1.5 text-[12px]"
          >
            <div className="flex">
              <span className="w-20 flex-shrink-0 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Kind
              </span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>Software Engineer</span>
            </div>
            <div className="flex">
              <span className="w-20 flex-shrink-0 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Location
              </span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>California, USA</span>
            </div>
            <div className="flex">
              <span className="w-20 flex-shrink-0 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Focus
              </span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>Accessible, human-centered products</span>
            </div>
            <div className="flex items-start">
              <span className="w-20 flex-shrink-0 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                About
              </span>
              <span className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                CS major specializing in building exceptional digital experiences. Always exploring new technologies and pushing boundaries.
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider like macOS */}
      <div className="mb-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <h3
          className="text-[10px] font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Technical Expertise
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.06 }}
              className="p-3.5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <h4 className="text-[11px] font-semibold mb-2" style={{ color: '#007aff' }}>
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span key={skill} className="macos-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FinderAbout;
