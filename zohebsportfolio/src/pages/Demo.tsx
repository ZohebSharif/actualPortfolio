import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Project } from './Admin';

interface Screenshot {
  image: string;
  description: string;
  fullWidth?: boolean;
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
            image: 'https://i.imgur.com/4YNauTT.png',
            description: 'The Chrome extension interface showing the AI suggesting the next optimal move in a Pokemon battle.'
          },
          {
            image: 'https://i.imgur.com/aM8wgJn.png',
            description: 'The backend ML model processing battle data to determine the best counter-strategy against the opponent\'s team.'
          },
          {
            image: 'https://i.imgur.com/gliPxIx.png',
            description: 'Utilized a Q-table to analyze the effectiveness of different moves and strategies based on the current battle state.'
          }
        ];
      case '2': // Java-Based Communications App
        return [
          {
            image: 'https://i.imgur.com/CqVSu0L.png',
            description: 'The main chat interface of the Java Communications App with multiple active conversations.'
          },
          {
            image: 'https://i.imgur.com/N0753uF.png',
            description: 'Server-side console showing real-time logs of incoming and outgoing messages.'
          },
          {
            image: 'https://i.imgur.com/Zry67qz.png',
            description: 'Multiple client windows demonstrating the app\'s ability to handle multiple users and conversations simultaneously.'
          }
        ];
      case '3': // Statistical Analysis with R
        return [
          {
            image: 'https://i.imgur.com/AIp7Epw.png',
            description: 'Presentation poster summarizing the research findings and statistical significance.'
          },
          {
            image: 'https://i.imgur.com/qLYDN87.png',
            description: 'R code demonstrating the hypothesis testing methodology used in the research.'
          },
          {
            image: 'https://i.imgur.com/XjxKHo5.png',
            description: 'Visualization of the statistical analysis results showing correlation between key variables.'
          }
        ];
      case '4': // Wordle Clone
        return [
          {
            image: 'https://i.imgur.com/tjPlOUM.png',
            description: 'The main game interface of my Java Wordle clone with an active game in progress.'
          },
          {
            image: 'https://i.imgur.com/cdSt45U.png',
            description: 'A game loss.'
          },
          {
            image: 'https://i.imgur.com/7tEKH8z.png',
            description: 'Source code for creating the GUI and handling user interactions.'
          }
        ];
      case '5': // DVD Collection Management System
        return [
          {
            image: 'https://i.imgur.com/XuRaIou.png',
            description: 'The main dashboard of the DVD Collection Management System showing the user\'s library overview.'
          },
          {
            image: 'https://i.imgur.com/ZmGOedG.png',
            description: 'Clicking "Play" on a DVD opens a new window with the DVD\'s movie, uses the devices native player.'
          },
          {
            image: 'https://i.imgur.com/u6WEbZK.png',
            description: 'DVDs are persisted in a local text file, allowing users to add, remove, and edit their collection.'
          }
        ];
      case '6': // HackDavis Project
        return [
          {
            image: 'https://i.imgur.com/qT7Pjoa.png',
            description: 'The main interface of EasyLearn showing the interactive chat where users can request lessons on any topic.'
          },
          {
            image: 'https://i.imgur.com/75YUbcg.png',
            description: 'After receiving a lesson, users can take an interactive quiz to test their knowledge of the material.'
          },
          {
            image: 'https://i.imgur.com/rKgJ3YX.png',
            description: 'The quiz module displays results and provides feedback on correct and incorrect answers to enhance learning.'
          }
        ];
      case '7': // AI Study Guide Generator
        return [          {
            image: 'https://i.imgur.com/mt2gk0U.png',
            description: 'The main interface of the AI Study Guide Generator with two tabs: "Create Guide" and "View Guides". Users can enter any topic to generate a comprehensive study guide which is processed through Groq API and stored in Supabase.'
          },
          {
            image: 'https://i.imgur.com/LU8XjVv.png',
            description: 'Live demonstration showing how the application retrieves AI-generated content from the Groq API, stores it in Supabase, and renders it as a formatted study guide with clear sections and subsections.'
          },
          {
            image: 'https://i.imgur.com/G9fpV74.png',
            description: 'The "View Guides" tab showing persistent storage functionality - previously saved study guides are queried from Supabase database and displayed with expandable sections for efficient content review and future reference.'
          }
        ];
      case '8': // ALS Publications Management System
        return [
          {
            image: 'https://i.imgur.com/IJdE8RA.png',
            description: 'Main web interface of the ALS Publications Management System showcasing the scientific publication carousel with category-based organization for Chemistry/Energy, Physics, Bioscience, and other research domains at Lawrence Berkeley National Laboratory.'
          },
          {
            image: 'https://i.imgur.com/phujwfu.png',
            description: 'Interactive slideshow view displaying scientific research publications with smooth transitions and professional presentation optimized for research institution environments and conference presentations.'
          },
          {
            image: 'https://i.imgur.com/kf3VO0F.png',
            description: 'Administrative interface for content management, allowing authorized users to add, edit, and organize scientific publications across different research categories with enterprise-level data handling and user authentication.'
          }
        ];
      case '9': // Word Hunt Cheater
        return [
          {
            image: 'https://i.imgur.com/UOurQ7z.png',
            description: 'Easy input grid where you type the letters from your Word Hunt game. The cursor moves automatically to the next cell so you can quickly enter the whole board.',
            fullWidth: true
          },
          {
            image: 'https://i.imgur.com/Ddrwh2Q.png',
            description: 'All possible words shown with their point values. The app finds every word in the grid and sorts them by points, showing your total potential score and word count.',
            fullWidth: true
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
        id: '8',
        title: 'ALS Publications Management System',
        description: 'Developed a sophisticated scientific publication management and visualization platform for Lawrence Berkeley National Laboratory\'s Advanced Light Source facility. Features a multi route React application with admin and slideshow views, scientific data visualization with interactive carousel displays, and category based content organization across Chemistry/Energy, Physics, Bioscience, and other research domains. Built with enterprise level architecture for prestigious research institution.',
        image: 'https://i.imgur.com/IJdE8RA.png',
        tags: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Scientific Data Visualization', 'Enterprise Development', 'Research Institutions'],
        github: 'https://zohebsharif.github.io/EasyPublication/',
        demo: '/demo/8',
        featured: true
      },
      {
        id: '1',
        title: 'AI Pokemon Player',
        description: 'A themed Chrome extension with a user-friendly UI to assist players in Pokemon Showdown by suggesting optimal moves.',
        image: 'https://images.unsplash.com/photo-1542779283-429940ce8336',
        tags: ['Fetch AI Agent', 'PyTorch', 'Python', 'Machine Learning', 'CSS', 'HTML'],
        github: 'https://github.com/ZohebSharif/pokemon-showdown-bot',
        demo: '/demo/1',
        featured: true
      },
      {
        id: '2',
        title: 'Java-Based Communications App',
        description: 'Developed a robust, full-featured messaging application with real-time client-server communication.',
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624',
        tags: ['Java', 'Socket Programming', 'Multithreading', 'GUI Design'],
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
        featured: true
      },
      {
        id: '3',
        title: 'Statistical Analysis with R',
        description: 'Research project focused on conducting statistical analysis and hypothesis testing using R.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        tags: ['R', 'Statistical Analysis', 'Data Science', 'Linear Regression'],
        github: '',
        demo: '/demo/3',
        featured: false
      },
      {
        id: '4',
        title: 'Wordle Clone',
        description: 'I built a Wordle game from scratch using Java and Swing.',
        image: 'https://assetsio.gnwcdn.com/wordle-past-answers-header.jpg?width=690&quality=70&format=jpg&dpr=2&auto=webp',
        tags: ['Java', 'Java Swing', 'UI Design', 'Algorithm Design'],
        github: 'https://github.com/ZohebSharif/wordleUnlimited',
        demo: '/demo/4',
        featured: false
      },
      {
        id: '5',
        title: 'DVD Collection Management System',
        description: 'Developed a comprehensive DVD collection management application featuring dual interfaces.',
        image: 'https://i.ebayimg.com/images/g/ZPgAAOSwn6Zj9Apd/s-l1600.webp',
        tags: ['Java', 'Java Swing', 'OOP', 'File I/O'],
        github: 'https://github.com/ZohebSharif/dvdPlayer',
        demo: '/demo/5',
        featured: false
      },
      {
        id: '7',
        title: 'AI Study Guide Generator',
        description: 'Developed a React-based web application that generates comprehensive study guides on any topic using AI.',
        image: 'https://i.imgur.com/mt2gk0U.png',
        tags: ['React', 'Node.js', 'Express', 'Supabase', 'Groq API', 'AI', 'Full Stack'],
        github: 'https://github.com/ZohebSharif/AIStudyGuideGenerator',
        demo: '/demo/7',
        featured: true
      },
      {
        id: '9',
        title: 'Word Hunt Cheater',
        description: "Built a tool to help you win at Word Hunt games. Just enter the 4x4 letter grid, and it finds all possible words, ranks them by points, and shows you the total score. Quick input with auto-cursor movement makes it super easy to use.",
        image: 'https://i.imgur.com/UOurQ7z.png',
        tags: ['React', 'TypeScript', 'Algorithms', 'Tailwind CSS', 'DFS', 'Binary Search', 'Vite'],
        github: 'https://github.com/ZohebSharif/wordhuntcheater',
        demo: '/demo/9',
        featured: true
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
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 ${project.id === '9' ? 'max-w-4xl mx-auto' : ''}`}>
          {screenshots.map((screenshot, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`bg-navy border border-muted rounded-lg overflow-hidden ${screenshot.fullWidth && screenshots.length === 1 ? 'md:col-span-2' : ''}`}
            >
              <div className={`${screenshot.fullWidth ? 'p-2' : 'aspect-video'} overflow-hidden flex items-center justify-center bg-navy-dark`}>
                <img 
                  src={screenshot.image} 
                  alt={`Screenshot ${index + 1} of ${project.title}`} 
                  className={`${screenshot.fullWidth ? 'max-w-full max-h-[30vh] object-contain' : 'w-full h-full object-cover'} transition-transform duration-500 hover:scale-105`}
                />
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold text-slate-light mb-2">Screenshot {index + 1}</h3>
                <p className="text-slate text-xs">{screenshot.description}</p>
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
              {project.id === '8' ? 'View Live Demo' : 'View Source Code'}
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