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
  vertical?: boolean;
}

const Demo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);

  // Allow scrolling on demo pages (body/root have overflow:hidden for the main macOS layout)
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    const root = document.getElementById('root');
    if (root) {
      root.style.overflow = 'auto';
      root.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (root) {
        root.style.overflow = '';
        root.style.height = '';
      }
    };
  }, []);

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
      case '10': // EasyAds
        return [
          {
            image: 'https://imgur.com/x9qD197.png',
            description: 'System architecture and design documentation showing the AI-powered ad generation pipeline and real-time market analytics integration.'
          },
          {
            image: 'https://imgur.com/GO73M4R.png',
            description: 'AI-generated advertisement for Bluetooth earbuds, demonstrating the platform\'s ability to create dynamic product-specific ads in real-time.'
          },
          {
            image: 'https://imgur.com/sNlaLTl.png',
            description: 'Real-time market information dashboard displaying pricing data, demand levels, and ad performance metrics updated every three minutes.'
          }
        ];
      case '11': // Android FlashCard App
        return [
          {
            image: 'https://i.imgur.com/kMkbNw5.png',
            description: 'Statistics screen displaying comprehensive study progress, including accuracy rates, cards mastered, and learning streaks to track improvement over time.',
            vertical: true
          },
          {
            image: 'https://i.imgur.com/vssR6lr.png',
            description: 'Main screen of the Android FlashCard App showing the card management interface with organized study sets and easy navigation.',
            vertical: true
          },
          {
            image: 'https://i.imgur.com/Gm2mEnq.png',
            description: 'Question screen showing the flashcard in study mode with flip animation and instant feedback on answers.',
            vertical: true
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
      },
      {
        id: '10',
        title: 'EasyAds',
        description: 'Developed an AI-powered ad generation platform that creates dynamic advertisements for videos using LLM technology. Built with real-time market analytics tracking pricing, demand levels, and ad performance metrics updated every three minutes.',
        image: 'https://imgur.com/GO73M4R.png',
        tags: ['AI', 'LLM', 'Full Stack', 'Real-time Analytics', 'Hackathon', 'Market Intelligence'],
        github: 'https://devpost.com/software/easyads?ref_content=my-projects-tab&ref_feature=my_projects',
        demo: 'https://devpost.com/software/easyads?ref_content=my-projects-tab&ref_feature=my_projects',
        featured: true
      },
      {
        id: '11',
        title: 'Android FlashCard App',
        description: 'Built a native Android flashcard application for efficient study and learning. The app features card management, study modes, and persistent storage using Android development best practices with Java.',
        image: 'https://i.imgur.com/kMkbNw5.png',
        tags: ['Android', 'Java', 'Gradle', 'Mobile Development', 'Educational App'],
        github: 'https://github.com/ZohebSharif/AndroidFlashCardApp',
        demo: 'https://github.com/ZohebSharif/AndroidFlashCardApp',
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
    <div
      className="w-full pt-20 pb-16 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
      }}
    >
      {/* Back button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Button 
          onClick={() => navigate('/')} 
          variant="ghost" 
          className="mb-6"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Button>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{ color: 'rgba(255,255,255,0.95)' }}
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
            <span key={index} className="macos-tag">
              {tag}
            </span>
          ))}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mb-12"
          style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}
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
          className="text-2xl font-bold mb-8"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          Project Screenshots & Details
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 ${project.id === '9' ? 'max-w-4xl mx-auto' : ''} ${project.id === '11' ? 'lg:grid-cols-3' : ''}`}>
          {screenshots.map((screenshot, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`rounded-xl overflow-hidden ${screenshot.fullWidth && screenshots.length === 1 ? 'md:col-span-2' : ''}`}
              style={{
                background: 'rgba(30, 30, 30, 0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className={`${screenshot.vertical ? 'p-4 min-h-[400px] flex items-center justify-center' : screenshot.fullWidth ? 'p-2' : 'aspect-video'} overflow-hidden flex items-center justify-center`}
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                <img 
                  src={screenshot.image} 
                  alt={`Screenshot ${index + 1} of ${project.title}`} 
                  className={`${screenshot.vertical ? 'max-h-[350px] max-w-full object-contain' : screenshot.fullWidth ? 'max-w-full max-h-[30vh] object-contain' : 'w-full h-full object-cover'} transition-transform duration-500 hover:scale-105`}
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Screenshot {index + 1}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {screenshot.description}
                </p>
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
            <button
              onClick={() => window.open(project.github, '_blank')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                color: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {project.id === '8' ? 'View Live Demo' : 'View Source Code'}
            </button>
          )}
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(0,122,255,0.25)',
              color: '#5ac8fa',
              border: '1px solid rgba(0,122,255,0.3)',
            }}
          >
            Back to Portfolio
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;