import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Github, Calendar, MapPin } from 'lucide-react';

interface Award {
  id: string;
  title: string;
  event: string;
  placement: string;
  date: string;
  description: string;
  devpostLink: string;
  githubLink: string;
  tags: string[];
}

const hackathonWins: Award[] = [
  {
    id: '1',
    title: 'Self Evolving Agents',
    event: 'Creators Corner SF',
    placement: 'Freepik Track Winner',
    date: 'November 2025',
    description:
      'Won 1st place in Freepik Track. Created an automatic ad generator for best selling items for entrepreneurs.',
    devpostLink:
      'https://devpost.com/software/easyads?ref_content=my-projects-tab&ref_feature=my_projects',
    githubLink: 'https://github.com/nicholasmanha/ag-frontend',
    tags: ['Freepik API', 'Self Evolving Agents', 'React', 'Flask'],
  },
  {
    id: '2',
    title: 'AI File Explorer',
    event: 'Hack Hayward',
    placement: 'Best UI/UX',
    date: 'March 2025',
    description:
      'Won Best UI/UX with an AI powered System File Browser that mimicked the native file browsers for MacOS.',
    devpostLink: '#',
    githubLink: '#',
    tags: ['AI', 'File Management', 'UI/UX', 'Flask'],
  },
  {
    id: '3',
    title: 'Climate Change Awareness Site',
    event: 'Chabot Hacks',
    placement: 'Best Overall',
    date: 'May 2024',
    description:
      'Won 1st place. Built a climate change awareness site with a carbon footprint calculator.',
    devpostLink: '#',
    githubLink: 'https://github.com/isaiahw13/Climate-Change-Site.git',
    tags: ['Web Development', 'Climate Tech', 'MongoDB'],
  },
];

const FinderAwards = () => {
  return (
    <div className="max-w-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hackathonWins.map((award, idx) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.1 }}
            className="rounded-xl overflow-hidden group"
            style={{
              background: 'rgba(50, 50, 50, 0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Placement badge header */}
            <div
              className="px-4 py-2.5 flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, rgba(0,122,255,0.2), rgba(88,86,214,0.2))',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Trophy size={14} style={{ color: '#ffcc00' }} />
              <span className="text-xs font-bold" style={{ color: '#ffcc00' }}>
                {award.placement}
              </span>
            </div>

            <div className="p-4">
              <h3
                className="text-base font-bold mb-1 group-hover:text-[#007aff] transition-colors"
                style={{ color: 'rgba(255,255,255,0.95)' }}
              >
                {award.title}
              </h3>

              <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  {award.event}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {award.date}
                </span>
              </div>

              <p className="text-xs mb-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {award.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {award.tags.map((tag) => (
                  <span key={tag} className="macos-tag" style={{ fontSize: '10px' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                {award.devpostLink !== '#' && (
                  <a
                    href={award.devpostLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <ExternalLink size={10} />
                    Devpost
                  </a>
                )}
                {award.githubLink !== '#' && (
                  <a
                    href={award.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <Github size={10} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinderAwards;
