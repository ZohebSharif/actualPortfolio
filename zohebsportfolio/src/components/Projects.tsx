import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/pages/Admin';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isTagsVisible, setIsTagsVisible] = useState(false);

  // Load projects from local storage
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects');
    if (storedProjects) {
      const loadedProjects = JSON.parse(storedProjects);
      setProjects(loadedProjects);
      setFilteredProjects(loadedProjects);
      
      // Extract all unique tags
      const tagsSet = new Set<string>();
      loadedProjects.forEach((project: Project) => {
        project.tags.forEach(tag => tagsSet.add(tag));
      });
      setAllTags(Array.from(tagsSet));
    }
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else if (filter === 'featured') {
      setFilteredProjects(projects.filter(project => project.featured));
    } else {
      setFilteredProjects(projects.filter(project => 
        project.tags.includes(filter)
      ));
    }
  };
  
  // Sample projects if no projects are found in localStorage
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'AI Pokemon Player',
      description: 'A themed Chrome extension with a user-friendly UI to assist players in Pokemon Showdown by suggesting optimal moves. Integrates front-end technologies with AI-driven decision-making using PyTorch and Fetch AI. The AI model learns by parsing chat logs from Pokemon Showdown to suggest optimal moves based on previous gameplay data.',
      image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
      tags: ['Fetch AI Agent', 'PyTorch', 'Python', 'Machine Learning', 'CSS', 'HTML'],
      github: 'https://github.com/ZohebSharif/pokemon-showdown-bot',
      demo: '/demo/1',
      featured: true
    },
    {
      id: '2',
      title: 'Java-Based Communications App',
      description: 'Developed a robust, full-featured messaging application with real-time client-server communication. Collaborated with two teammates to design and implement a scalable chat system using Java Sockets. Built a multithreaded server to handle concurrent client connections efficiently and created a responsive GUI with serializable Packet objects for structured message transmission.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
      tags: ['Java', 'Socket Programming', 'Multithreading', 'GUI Design', 'Software Architecture', 'Testing'],
      github: 'https://github.com/ZohebSharif/communicationsGroup4',
      demo: '/demo/2',
      featured: true
    },
    {
      id: '6',
      title: 'HackDavis Project',
      description: 'Developed an innovative educational platform called EasyLearn during the HackDavis hackathon. This solution addresses the challenge of quick, accessible learning through AI-powered lessons, interactive quizzes, and voice interaction capabilities.',
      image: 'https://i.imgur.com/BHuLvjO.png',
      tags: ['Hackathon', 'Team Project', 'React', 'Flask', 'MongoDB', 'Eleven Labs API', 'Full Stack'],
      github: 'https://github.com/yoshiyahoo/HackDavis-Repo',
      demo: '/demo/6',
      featured: true,
      screenshots: [
        'https://i.imgur.com/qT7Pjoa.png',
        'https://i.imgur.com/75YUbcg.png',
        'https://i.imgur.com/rKgJ3YX.png'
      ]
    },
    {
      id: '3',
      title: 'Statistical Analysis with R',
      description: 'Research project focused on conducting statistical analysis and hypothesis testing using R, with a particular focus on linear regression models using datasets from Kaggle. Explored various data models and applied statistical concepts to identify significant trends and patterns.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      tags: ['R', 'Statistical Analysis', 'Data Science', 'Linear Regression'],
      github: '',
      demo: 'https://i.imgur.com/AIp7Epw.png',
      featured: false,
      screenshots: [
        'https://i.imgur.com/5EO74Ut.jpg',  // Direct image link, not album link
        'https://i.imgur.com/AIp7Epw.png',
      ]
    },
    {
      id: '7',
      title: 'AI Study Guide Generator',
      description: 'Developed a React-based web application that generates comprehensive study guides on any topic using AI. The app uses Groq\'s LLM (llama3-8b-8192 model) to create detailed study materials and stores them in a Supabase database for easy access later. Features a clean dark-themed UI with two tabs: one for creating new guides and one for viewing saved guides.',
      image: 'https://i.imgur.com/LW9S3pW.png',
      tags: ['React', 'Node.js', 'Express', 'Supabase', 'Groq API', 'AI', 'Full Stack'],
      github: 'https://github.com/ZohebSharif/AIStudyGuideGenerator',
      demo: '/demo/7',
      featured: true,
      screenshots: [
        'https://i.imgur.com/mt2gk0U.png',
        'https://i.imgur.com/LU8XjVv.png',
        'https://i.imgur.com/G9fpV74.png'
      ]
    },
    {
      id: '4',
      title: 'Wordle Clone',
      description: 'I built a Wordle game from scratch using Java and Swing, featuring an interactive graphical user interface (GUI) for players to guess a secret five-letter word within a limited number of attempts. The game provides real-time feedback on correct, misplaced, and incorrect letters, with limited attempts to solve the puzzle, adding a challenge element.',
      image: 'https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=690&quality=70&format=jpg&dpr=2&auto=webp',
      tags: ['Java', 'Java Swing', 'UI Design', 'Algorithm Design', 'OOP', 'Problem Solving'],
      github: 'https://github.com/ZohebSharif/wordleUnlimited',
      demo: '/demo/4',
      featured: false
    },
    {
      id: '5',
      title: 'DVD Collection Management System',
      description: 'Developed a comprehensive DVD collection management application featuring dual interfaces: a graphical user interface (GUI) and a console-based interface. The system allows users to manage DVD metadata (title, rating, running time), add or modify entries, filter by rating, calculate total running time, and even play movies using the system\'s default media player. Implemented with Java and Swing, the application demonstrates object-oriented programming principles including encapsulation and separation of concerns, with persistent data storage through file I/O.',
      image: 'https://i.ebayimg.com/images/g/ZPgAAOSwn6Zj9Apd/s-l1600.webp',
      tags: ['Java', 'Java Swing', 'OOP', 'File I/O', 'GUI Development', 'Data Management'],
      github: 'https://github.com/ZohebSharif/dvdPlayer',
      demo: '/demo/5',
      featured: false
    }
  ];
  
  // If no projects are loaded, use sample projects for display
  const displayProjects = projects.length === 0 
    ? (activeFilter === 'featured' 
        ? sampleProjects.filter(project => project.featured) 
        : activeFilter === 'all' 
          ? sampleProjects 
          : sampleProjects.filter(project => project.tags.includes(activeFilter)))
    : filteredProjects;

  // Filter buttons animation variant
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="clip-path-wave bg-navy-light py-24 pt-32 md:pt-40 pb-64 md:pb-80 lg:pb-96 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none sparkle-bg">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="text-accent font-mono mr-2">02.</span> My Projects
        </motion.h2>
        
        {/* Filter buttons */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <motion.div variants={item}>
                <Button
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('all')}
                  className={activeFilter === 'all' ? 'glow' : 'border-muted text-slate hover:bg-muted'}
                >
                  All
                </Button>
              </motion.div>
              
              <motion.div variants={item}>
                <Button
                  variant={activeFilter === 'featured' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('featured')}
                  className={activeFilter === 'featured' ? 'glow' : 'border-muted text-slate hover:bg-muted'}
                >
                  Featured
                </Button>
              </motion.div>
            </div>
            
            {allTags.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsTagsVisible(!isTagsVisible)}
                className="text-accent"
              >
                {isTagsVisible ? 'Hide Tags' : 'Show All Tags'}
              </Button>
            )}
          </div>
          
          <AnimatePresence>
            {isTagsVisible && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 mb-4 overflow-hidden"
              >
                {allTags.map((tag, index) => (
                  <motion.div 
                    key={tag} 
                    variants={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={activeFilter === tag ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange(tag)}
                      className={activeFilter === tag ? 'glow' : 'border-muted/50 text-slate hover:bg-muted/30'}
                    >
                      {tag}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mb-12 md:mb-16 lg:mb-24">
          <AnimatePresence mode="wait">
            {displayProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProjects.length === 0 && projects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="glass-card p-10 rounded-xl max-w-lg mx-auto">
              <p className="text-slate mb-4">No projects match the selected filter.</p>
              <Button 
                variant="default" 
                onClick={() => handleFilterChange('all')}
                className="text-accent bg-navy hover:bg-navy-dark border border-accent/50 hover:border-accent transition-all duration-300"
              >
                Show all projects
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
