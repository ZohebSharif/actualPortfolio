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
      id: '8',
      title: 'ALS Publications Management System',
      description: 'Built a publication management platform for Lawrence Berkeley Lab with admin and slideshow views, interactive visualizations, and organized research content across multiple scientific fields.',
      image: 'https://i.imgur.com/IJdE8RA.png',
      tags: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Scientific Data Visualization'],
      github: 'https://zohebsharif.github.io/EasyPublication/',
      demo: '/demo/8',
      featured: true,
      screenshots: []
    },
    {
      id: '2',
      title: 'LangGraph AI Agent - EasyAds',
      description: 'Full-stack AI agent using LangGraph with Python backend and TypeScript/React frontend for reasoning through complex tasks.',
      image: 'https://imgur.com/GO73M4R.png',
      tags: ['LangGraph', 'Python', 'TypeScript', 'React', 'AI Agent'],
      github: 'https://github.com/nicholasmanha/ag-frontend',
      demo: 'https://github.com/nicholasmanha/ag-frontend',
      featured: true,
      screenshots: []
    },
    {
      id: '3',
      title: 'Android FlashCard App',
      description: 'Native Android flashcard app for study and learning with card management, study modes, and persistent storage.',
      image: 'https://i.imgur.com/kMkbNw5.png',
      tags: ['Android', 'Java', 'Gradle', 'Mobile Development'],
      github: 'https://github.com/ZohebSharif/AndroidFlashCardApp',
      demo: 'https://github.com/ZohebSharif/AndroidFlashCardApp',
      featured: true,
      screenshots: []
    },
    {
      id: '1',
      title: 'AI Pokemon Player',
      description: 'A Chrome extension to assist Pokemon Showdown players by suggesting optimal moves using PyTorch ML and Fetch AI agents.',
      image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
      tags: ['Fetch AI', 'PyTorch', 'Python', 'ML', 'Chrome Extension'],
      github: 'https://github.com/ZohebSharif/pokemon-showdown-bot',
      demo: '/demo/1',
      featured: true,
      screenshots: []
    },
    {
      id: '4',
      title: 'Java Communications App',
      description: 'Robust messaging application with client-server real-time communication using Java Sockets and multithreading.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
      tags: ['Java', 'Socket Programming', 'Multithreading', 'GUI'],
      github: 'https://github.com/ZohebSharif/communicationsGroup4',
      demo: '/demo/4',
      featured: true,
      screenshots: []
    },
    {
      id: '9',
      title: 'Word Hunt Cheater',
      description: 'Enter a 4x4 letter grid and find all possible words ranked by points. Uses DFS and binary search algorithms.',
      image: 'https://i.imgur.com/UOurQ7z.png',
      tags: ['React', 'TypeScript', 'DFS', 'Binary Search', 'Algorithms'],
      github: 'https://github.com/ZohebSharif/wordhuntcheater',
      demo: '/demo/9',
      featured: false,
      screenshots: []
    },
    {
      id: '6',
      title: 'HackDavis — EasyLearn',
      description: 'Educational platform with AI-based lessons, interactive quizzes, and voice interaction for quick, ubiquitous learning.',
      image: 'https://i.imgur.com/BHuLvjO.png',
      tags: ['React', 'Flask', 'MongoDB', 'Eleven Labs API', 'Full Stack'],
      github: 'https://github.com/yoshiyahoo/HackDavis-Repo',
      demo: '/demo/6',
      featured: false,
      screenshots: []
    },
    {
      id: '7',
      title: 'AI Study Guide Generator',
      description: "React app that generates study guides using Groq's LLM and stores them in Supabase for later retrieval.",
      image: 'https://i.imgur.com/LW9S3pW.png',
      tags: ['React', 'Node.js', 'Express', 'Supabase', 'Groq API', 'AI'],
      github: 'https://github.com/ZohebSharif/AIStudyGuideGenerator',
      demo: '/demo/7',
      featured: false,
      screenshots: []
    },
    {
      id: '10',
      title: 'Statistical Analysis with R',
      description: 'Research project for statistical analysis and hypothesis testing with R, focusing on linear regression models.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      tags: ['R', 'Statistical Analysis', 'Data Science', 'Linear Regression'],
      github: '',
      demo: '/demo/10',
      featured: false,
      screenshots: []
    },
    {
      id: '11',
      title: 'Wordle Clone',
      description: 'Wordle game built in Java/Swing with interactive GUI, instant feedback on letter placement, and limited attempts.',
      image: 'https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=690&quality=70&format=jpg&dpr=2&auto=webp',
      tags: ['Java', 'Java Swing', 'UI Design', 'Algorithms'],
      github: 'https://github.com/ZohebSharif/wordleUnlimited',
      demo: '/demo/11',
      featured: false,
      screenshots: []
    },
    {
      id: '12',
      title: 'DVD Collection Manager',
      description: 'DVD collection management with GUI and console interfaces, media playback, filtering, and persistent file storage.',
      image: 'https://i.ebayimg.com/images/g/ZPgAAOSwn6Zj9Apd/s-l1600.webp',
      tags: ['Java', 'Java Swing', 'OOP', 'File I/O'],
      github: 'https://github.com/ZohebSharif/dvdPlayer',
      demo: '/demo/12',
      featured: false,
      screenshots: []
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
