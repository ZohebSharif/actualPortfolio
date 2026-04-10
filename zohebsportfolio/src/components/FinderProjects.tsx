import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
}

const sampleProjects: ProjectData[] = [
  {
    id: '8',
    title: 'ALS Publications Management System',
    description:
      'Built a publication management platform for Lawrence Berkeley Lab with admin and slideshow views, interactive visualizations, and organized research content across multiple scientific fields.',
    image: 'https://i.imgur.com/IJdE8RA.png',
    tags: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Scientific Data Viz'],
    github: 'https://zohebsharif.github.io/EasyPublication/',
    demo: '/demo/8',
    featured: true,
  },
  {
    id: '2',
    title: 'LangGraph AI Agent - EasyAds',
    description:
      'Full-stack AI agent using LangGraph with Python backend and TypeScript/React frontend for reasoning through complex tasks.',
    image: 'https://imgur.com/GO73M4R.png',
    tags: ['LangGraph', 'Python', 'TypeScript', 'React', 'AI Agent'],
    github: 'https://github.com/nicholasmanha/ag-frontend',
    demo: 'https://github.com/nicholasmanha/ag-frontend',
    featured: true,
  },
  {
    id: '3',
    title: 'Android FlashCard App',
    description:
      'Native Android flashcard app for study and learning with card management, study modes, and persistent storage.',
    image: 'https://i.imgur.com/kMkbNw5.png',
    tags: ['Android', 'Java', 'Gradle', 'Mobile Development'],
    github: 'https://github.com/ZohebSharif/AndroidFlashCardApp',
    demo: 'https://github.com/ZohebSharif/AndroidFlashCardApp',
    featured: true,
  },
  {
    id: '1',
    title: 'AI Pokemon Player',
    description:
      'A Chrome extension to assist Pokemon Showdown players by suggesting optimal moves using PyTorch ML and Fetch AI agents.',
    image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
    tags: ['Fetch AI', 'PyTorch', 'Python', 'ML', 'Chrome Extension'],
    github: 'https://github.com/ZohebSharif/pokemon-showdown-bot',
    demo: '/demo/1',
    featured: true,
  },
  {
    id: '4',
    title: 'Java Communications App',
    description:
      'Robust messaging application with client-server real-time communication using Java Sockets and multithreading.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
    tags: ['Java', 'Socket Programming', 'Multithreading', 'GUI'],
    github: 'https://github.com/ZohebSharif/communicationsGroup4',
    demo: '/demo/2',
    featured: true,
  },
  {
    id: '9',
    title: 'Word Hunt Cheater',
    description:
      'Enter a 4x4 letter grid and find all possible words ranked by points. Uses DFS and binary search algorithms.',
    image: 'https://i.imgur.com/UOurQ7z.png',
    tags: ['React', 'TypeScript', 'DFS', 'Binary Search', 'Algorithms'],
    github: 'https://github.com/ZohebSharif/wordhuntcheater',
    demo: '/demo/9',
    featured: false,
  },
  {
    id: '6',
    title: 'HackDavis — EasyLearn',
    description:
      'Educational platform with AI-based lessons, interactive quizzes, and voice interaction for quick, ubiquitous learning.',
    image: 'https://i.imgur.com/BHuLvjO.png',
    tags: ['React', 'Flask', 'MongoDB', 'Eleven Labs API', 'Full Stack'],
    github: 'https://github.com/yoshiyahoo/HackDavis-Repo',
    demo: '/demo/6',
    featured: false,
  },
  {
    id: '7',
    title: 'AI Study Guide Generator',
    description:
      "React app that generates study guides using Groq's LLM and stores them in Supabase for later retrieval.",
    image: 'https://i.imgur.com/LW9S3pW.png',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'Groq API', 'AI'],
    github: 'https://github.com/ZohebSharif/AIStudyGuideGenerator',
    demo: '/demo/7',
    featured: false,
  },
  {
    id: '3',
    title: 'Statistical Analysis with R',
    description:
      'Research project for statistical analysis and hypothesis testing with R, focusing on linear regression models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['R', 'Statistical Analysis', 'Data Science', 'Linear Regression'],
    github: '',
    demo: '/demo/3',
    featured: false,
  },
  {
    id: '4',
    title: 'Wordle Clone',
    description:
      'Wordle game built in Java/Swing with interactive GUI, instant feedback on letter placement, and limited attempts.',
    image:
      'https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=690&quality=70&format=jpg&dpr=2&auto=webp',
    tags: ['Java', 'Java Swing', 'UI Design', 'Algorithms'],
    github: 'https://github.com/ZohebSharif/wordleUnlimited',
    demo: '/demo/4',
    featured: false,
  },
  {
    id: '5',
    title: 'DVD Collection Manager',
    description:
      'DVD collection management with GUI and console interfaces, media playback, filtering, and persistent file storage.',
    image: 'https://i.ebayimg.com/images/g/ZPgAAOSwn6Zj9Apd/s-l1600.webp',
    tags: ['Java', 'Java Swing', 'OOP', 'File I/O'],
    github: 'https://github.com/ZohebSharif/dvdPlayer',
    demo: '/demo/5',
    featured: false,
  },
];

const FinderProjects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const navigate = useNavigate();

  const displayed = filter === 'featured' ? sampleProjects.filter((p) => p.featured) : sampleProjects;

  if (selectedProject) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-1.5 text-sm mb-4 hover:opacity-80 transition-opacity"
          style={{ color: '#007aff' }}
        >
          <ArrowLeft size={14} />
          Back to Projects
        </button>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div
            className="w-full sm:w-80 h-40 sm:h-48 rounded-xl overflow-hidden flex-shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2" style={{ color: 'rgba(255,255,255,0.95)' }}>
              {selectedProject.title}
            </h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="macos-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Github size={13} />
                  Source Code
                </a>
              )}
              <button
                onClick={() => navigate(`/demo/${selectedProject.id}`)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: 'rgba(0,122,255,0.2)',
                  color: '#5ac8fa',
                  border: '1px solid rgba(0,122,255,0.3)',
                }}
              >
                <ExternalLink size={13} />
                View Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => setFilter('all')}
          className="px-3 py-1 rounded-md text-xs font-medium transition-colors"
          style={{
            background: filter === 'all' ? 'rgba(0,122,255,0.3)' : 'rgba(255,255,255,0.06)',
            color: filter === 'all' ? '#5ac8fa' : 'rgba(255,255,255,0.5)',
            border: `1px solid ${filter === 'all' ? 'rgba(0,122,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          All ({sampleProjects.length})
        </button>
        <button
          onClick={() => setFilter('featured')}
          className="px-3 py-1 rounded-md text-xs font-medium transition-colors"
          style={{
            background: filter === 'featured' ? 'rgba(0,122,255,0.3)' : 'rgba(255,255,255,0.06)',
            color: filter === 'featured' ? '#5ac8fa' : 'rgba(255,255,255,0.5)',
            border: `1px solid ${filter === 'featured' ? 'rgba(0,122,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          Featured ({sampleProjects.filter((p) => p.featured).length})
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {displayed.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="finder-project-card cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {project.featured && (
                  <div
                    className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold"
                    style={{
                      background: 'rgba(0,122,255,0.8)',
                      color: 'white',
                    }}
                  >
                    Featured
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3
                  className="text-sm font-semibold mb-1 group-hover:text-[#007aff] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-xs line-clamp-2 mb-2"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {project.description}
                </p>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: '#007aff' }}>
                  <span>View details</span>
                  <ChevronRight size={10} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinderProjects;
