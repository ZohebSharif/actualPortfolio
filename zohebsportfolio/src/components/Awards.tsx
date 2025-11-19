import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy, Calendar, MapPin } from 'lucide-react';

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

const Awards = () => {
  // Hackathon wins with actual achievements
  const hackathonWins: Award[] = [
    {
      id: '1',
      title: 'Self Evolving Agents',
      event: 'Creators Corner SF',
      placement: 'Freepik Track Winner',
      date: 'November 2025',
      description: 'Won 1st place in Freepik Track. Created an automatic ad generator for best selling items for entrepreneurs to make more sales.',
      devpostLink: 'https://devpost.com/software/easyads?ref_content=my-projects-tab&ref_feature=my_projects',
      githubLink: 'https://github.com/nicholasmanha/ag-frontend',
      tags: ['Freepik API', 'Self Evolving Agents', 'React', 'Flask', 'LinkUp', 'Loveable']
    },
    {
      id: '2',
      title: 'AI File Explorer',
      event: 'Hack Hayward',
      placement: 'Best UI/UX',
      date: 'March 2025',
      description: 'Won Best UI/UX with an AI powered System File Browser that mimiced the native file browsers for MacOS.',
      devpostLink: 'https://devpost.com/software/vector-o9jar8?_gl=1*1gu5afc*_gcl_au*MTczNjMxMzIzMS4xNzYzMTYxNjU0*_ga*MTA2NTkzNzgyMS4xNzYzMTYxNjU0*_ga_0YHJK3Y10M*czE3NjM0DDg1NzIkbzUkZzEkdDE3NjM0DDg2MTIkajIwJGww',
      githubLink: '#', // GitHub no longer exists
      tags: ['AI', 'File Management', 'Backend Development', 'UI/UX', "Design", "Flask"]
    },
    {
      id: '3',
      title: 'Climate Change Awareness Site',
      event: 'Chabot Hacks',
      placement: 'Best Overall',
      date: 'May 2024',
      description: 'Won 1st place in Best Overall. Created a climate change awareness site where users become aware of their carbon footprint with our carbon footprint calculator.',
      devpostLink: '#', // No Devpost link
      githubLink: 'https://github.com/isaiahw13/Climate-Change-Site.git',
      tags: ['Web Development', 'Climate Tech', 'Environmental Impact', 'MongoDB']
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardHover = {
    rest: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="awards" className="clip-path-wave bg-navy py-24 pt-32 md:pt-40 pb-64 md:pb-80 lg:pb-96 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none sparkle-bg">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-60 bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0"></div>
        
        {/* Floating elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-4 h-4 bg-accent/30 rounded-full blur-sm"
        />
        <motion.div 
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-6 h-6 bg-secondary/40 rounded-full blur-sm"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="text-accent font-mono mr-2">04.</span> Awards
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-semibold text-slate-light mb-16"
        >
          <Trophy className="text-accent" size={32} />
          Hackathon Wins
          <Trophy className="text-accent" size={32} />
        </motion.h3>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hackathonWins.map((award, index) => (
            <motion.div
              key={award.id}
              variants={item}
              initial="rest"
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={cardHover}
                className="relative h-full bg-gradient-to-br from-navy-light to-navy border border-muted/50 rounded-xl overflow-hidden backdrop-blur-sm hover:border-accent/50 transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Multiple gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/5 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Header Section with Placement Badge */}
                <div className="relative p-6 pb-4">
                  {/* Placement Badge */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180, y: -20 }}
                    animate={{ scale: 1, rotate: 0, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6, ease: "backOut" }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-accent to-secondary text-navy-dark text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-10 whitespace-nowrap max-w-32 text-center"
                  >
                    <Trophy size={10} />
                    <span className="truncate">{award.placement}</span>
                  </motion.div>
                  
                  {/* Title with enhanced styling and proper spacing for badge */}
                  <motion.h4 
                    className="text-2xl font-bold text-slate-light group-hover:text-accent transition-colors duration-300 mb-3 pr-40 leading-tight"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {award.title}
                  </motion.h4>
                  
                  {/* Event and Date with better layout */}
                  <div className="space-y-1 text-accent font-mono text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-secondary" />
                      <span>{award.event}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-secondary" />
                      <span>{award.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6 space-y-4 relative z-10 flex-1 flex flex-col">
                  {/* Description with better typography */}
                  <p className="text-slate text-sm leading-relaxed group-hover:text-slate-light transition-colors duration-300 line-clamp-4">
                    {award.description}
                  </p>

                  {/* Enhanced Tags with better spacing */}
                  <div className="flex flex-wrap gap-2 pt-2 flex-1">
                    {award.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 + tagIndex * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="inline-flex items-center justify-center px-3 py-1.5 h-8 text-xs bg-navy/80 rounded-full border border-accent/30 text-slate-light hover:border-accent/60 hover:bg-accent/10 transition-all duration-200 cursor-default font-medium whitespace-nowrap"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced Links with better styling - Always at bottom */}
                  <div className="flex gap-6 pt-6 border-t border-muted/30 mt-auto">
                    {award.devpostLink !== '#' && (
                      <motion.a
                        href={award.devpostLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate hover:text-accent transition-all duration-300 text-sm group/link font-medium"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-2 rounded-full bg-accent/10 group-hover/link:bg-accent/20 transition-colors duration-300 shadow-md"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ExternalLink size={16} />
                        </motion.div>
                        <span>View on Devpost</span>
                      </motion.a>
                    )}
                    
                    {award.githubLink !== '#' && (
                      <motion.a
                        href={award.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate hover:text-accent transition-all duration-300 text-sm group/link font-medium"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-2 rounded-full bg-accent/10 group-hover/link:bg-accent/20 transition-colors duration-300 shadow-md"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Github size={16} />
                        </motion.div>
                        <span>View Source</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Enhanced corner decorations */}
                <div className="absolute top-0 left-0 w-8 h-8">
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-transparent rounded-br-full group-hover:from-accent/50 transition-colors duration-300"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8">
                  <div className="w-full h-full bg-gradient-to-tl from-secondary/30 to-transparent rounded-tl-full group-hover:from-secondary/50 transition-colors duration-300"></div>
                </div>
                
                {/* Side accent line */}
                <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 group-hover:via-accent/80 transition-colors duration-300"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;