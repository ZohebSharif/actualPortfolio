import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Project } from './Admin';

interface Screenshot {
  image: string;
  description: string;
}

const Demo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the project data from an API
    const loadProjectData = () => {
      setLoading(true);
      try {
        const storedProjects = localStorage.getItem('portfolio-projects');
        
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          const foundProject = projects.find((p: Project) => p.id === id);
          
          if (foundProject) {
            setProject(foundProject);
            // Load project-specific screenshots
            setScreenshots(getProjectScreenshots(foundProject.id));
          } else {
            // If project not found in stored projects, check the sample projects
            const sampleProjects = getSampleProjects();
            const sampleProject = sampleProjects.find(p => p.id === id);
            
            if (sampleProject) {
              setProject(sampleProject);
              // Load project-specific screenshots
              setScreenshots(getProjectScreenshots(sampleProject.id));
            } else {
              console.error('Project not found');
            }
          }
        } else {
          // If no projects in localStorage, check sample projects
          const sampleProjects = getSampleProjects();
          const sampleProject = sampleProjects.find(p => p.id === id);
          
          if (sampleProject) {
            setProject(sampleProject);
            // Load project-specific screenshots
            setScreenshots(getProjectScreenshots(sampleProject.id));
          } else {
            console.error('Project not found');
          }
        }
      } catch (error) {
        console.error('Error loading project data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [id]);

  // Function to get project-specific screenshots based on the project ID
  const getProjectScreenshots = (projectId: string): Screenshot[] => {
    switch (projectId) {
      case '1': // AI Pokemon Player
        return [
          {
            image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
            description: 'The Chrome extension interface showing the AI suggesting the next optimal move in a Pokemon battle.'
          },
          {
            image: 'https://i.imgur.com/Z0KCwM0.png',
            description: 'The backend ML model processing battle data to determine the best counter-strategy against the opponent\'s team.'
          },
          {
            image: 'https://i.imgur.com/JcfHBXD.png',
            description: 'Analytics dashboard showing win rates and performance metrics for different AI strategies.'
          }
        ];
      case '2': // Java-Based Communications App
        return [
          {
            image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
            description: 'The main chat interface of the Java Communications App with multiple active conversations.'
          },
          {
            image: 'https://i.imgur.com/DKH2Nni.png',
            description: 'The settings panel for configuring server connections and user preferences.'
          },
          {
            image: 'https://i.imgur.com/TJGPArE.png',
            description: 'The file transfer module showing real-time transfer rates and progress indicators.'
          }
        ];
      case '3': // Statistical Analysis with R
        return [
          {
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            description: 'Visualization of the statistical analysis results showing correlation between key variables.'
          },
          {
            image: 'https://i.imgur.com/wYdf5xZ.png',
            description: 'R code and output demonstrating the hypothesis testing methodology used in the research.'
          },
          {
            image: '/REU PRESENTABLE.png',
            description: 'Presentation poster summarizing the research findings and statistical significance.'
          }
        ];
      case '4': // Wordle Clone
        return [
          {
            image: 'https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=690&quality=70&format=jpg&dpr=2&auto=webp',
            description: 'The main game interface of my Java Wordle clone with an active game in progress.'
          },
          {
            image: 'https://i.imgur.com/IuO42Ft.png',
            description: 'The statistics screen showing player performance over multiple games.'
          },
          {
            image: 'https://i.imgur.com/6Lz94MB.png',
            description: 'Settings menu allowing customization of game difficulty and word length options.'
          }
        ];
      case '5': // DVD Collection Management System
        return [
          {
            image: 'https://i.ebayimg.com/images/g/ZPgAAOSwn6Zj9Apd/s-l1600.webp',
            description: 'The main dashboard of the DVD Collection Management System showing the user\'s library overview.'
          },
          {
            image: 'https://i.imgur.com/uLBaQRw.png',
            description: 'Add/Edit DVD form with fields for title, director, genre, and other metadata.'
          },
          {
            image: 'https://i.imgur.com/hK9FyER.png',
            description: 'Search and filtering interface that allows users to quickly find specific DVDs in their collection.'
          }
        ];
      default:
        // Default screenshots for any other projects
        return [
          {
            image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
            description: 'This screenshot shows the main interface of the application. Users can interact with the primary features here, including viewing statistics and initiating actions.'
          },
          {
            image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
            description: 'This view displays the application\'s settings panel where users can customize their experience, set preferences, and configure various aspects of the software.'
          },
          {
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            description: 'The analytics dashboard provides detailed insights into performance metrics, usage patterns, and other important data points that help users understand how the system is operating.'
          }
        ];
    }
  };

  // Sample projects function (copied from Projects.tsx)
  const getSampleProjects = () => {
    return [
      {
        id: '1',
        title: 'AI Pokemon Player',
        description: 'A themed Chrome extension with a user-friendly UI to assist players in Pokemon Showdown by suggesting optimal moves.',
        image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
        tags: ['Fetch AI Agent', 'PyTorch', 'Python', 'Machine Learning', 'CSS', 'HTML'],
        github: 'https://github.com/ZohebSharif/pokemon-showdown-bot',
        demo: '',
        featured: true
      },
      {
        id: '2',
        title: 'Java-Based Communications App',
        description: 'Developed a robust, full-featured messaging application with real-time client-server communication.',
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
        tags: ['Java', 'Socket Programming', 'Multithreading', 'GUI Design'],
        github: 'https://github.com/ZohebSharif/communicationsGroup4',
        demo: '',
        featured: true
      },
      {
        id: '3',
        title: 'Statistical Analysis with R',
        description: 'Research project focused on conducting statistical analysis and hypothesis testing using R.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        tags: ['R', 'Statistical Analysis', 'Data Science', 'Linear Regression'],
        github: '',
        demo: '/REU PRESENTABLE.png',
        featured: false
      },
      {
        id: '4',
        title: 'Wordle Clone',
        description: 'I built a Wordle game from scratch using Java and Swing.',
        image: 'https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=690&quality=70&format=jpg&dpr=2&auto=webp',
        tags: ['Java', 'Java Swing', 'UI Design', 'Algorithm Design'],
        github: 'https://github.com/ZohebSharif/wordleUnlimited',
        demo: '',
        featured: false
      },
      {
        id: '5',
        title: 'DVD Collection Management System',
        description: 'Developed a comprehensive DVD collection management application featuring dual interfaces.',
        image: 'https://i.ebayimg.com/images/g/ZPgAAOSwn6Zj9Apd/s-l1600.webp',
        tags: ['Java', 'Java Swing', 'OOP', 'File I/O'],
        github: 'https://github.com/ZohebSharif/dvdPlayer',
        demo: '',
        featured: false
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-dark">
        <div className="animate-pulse text-accent">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-navy-dark px-6">
        <h1 className="text-2xl text-slate-light mb-4">Project Not Found</h1>
        <p className="text-slate mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')} variant="outline" className="border-accent text-accent">
          <ArrowLeft size={16} className="mr-2" />
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-dark pt-20 pb-16 px-6">
      {/* Back button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Button 
          onClick={() => navigate('/')} 
          variant="ghost" 
          className="text-slate hover:text-accent hover:bg-navy-light mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Button>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-light mb-3"
        >
          {project.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate max-w-4xl mb-12"
        >
          {project.description}
        </motion.p>
      </div>
      
      {/* Project screenshots */}
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-slate-light mb-8"
        >
          Project Screenshots & Details
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {screenshots.map((screenshot, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-navy border border-muted rounded-lg overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={screenshot.image} 
                  alt={`Screenshot ${index + 1} of ${project.title}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-light mb-3">Screenshot {index + 1}</h3>
                <p className="text-slate text-sm">{screenshot.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Links section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {project.github && (
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10"
              onClick={() => window.open(project.github, '_blank')}
            >
              View Source Code
            </Button>
          )}
          
          <Button 
            variant="default" 
            className="bg-accent text-navy-dark hover:bg-accent/90"
            onClick={() => navigate('/')}
          >
            Back to Portfolio
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;