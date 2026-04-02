import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download } from 'lucide-react';

const FinderResume = () => {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        {/* PDF Preview */}
        <div
          className="w-full rounded-xl overflow-hidden mb-5"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            height: 'calc(100vh - 250px)',
            minHeight: 400,
          }}
        >
          <iframe
            src="/resume.pdf"
            className="w-full h-full"
            title="Resume"
            style={{ border: 'none' }}
          />
        </div>

        <div className="flex gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: '#007aff',
              color: 'white',
            }}
          >
            <ExternalLink size={14} />
            Open in New Tab
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Download size={14} />
            Download
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default FinderResume;
