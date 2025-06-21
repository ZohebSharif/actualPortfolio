import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Handle scroll event to change header style and track active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track which section is currently in view
      const sections = ['about', 'projects', 'experience', 'contact'];
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section is in view (with some padding for UX)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          } else if (window.scrollY < 100) {
            setActiveSection(''); // At the top of the page
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: "100%", transition: { ease: "easeInOut", duration: 0.3 } }
  };

  // Animation variants for nav items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-navy/90 backdrop-blur-md py-3 shadow-lg shadow-accent/5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-accent font-mono text-xl font-medium relative group">
            zohebsharif<span className="text-slate-light">.com</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a 
              key={link.name}
              href={link.href.startsWith('#') ? link.href : undefined}
              className={`nav-link font-mono text-sm tracking-wider ${
                activeSection === link.href.substring(1) ? 'active' : ''
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <span className="text-accent mr-1">{index + 1}.</span> {link.name}
            </motion.a>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.1 + 0.3 }}
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-accent/20 transform -translate-x-full hover:translate-x-0 transition-transform ease-out duration-300"></span>
                <span className="relative z-10">Resume</span>
              </Button>
            </a>
          </motion.div>
        </nav>
        
        {/* Mobile Menu Button */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="md:hidden text-slate-light hover:text-accent focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <X size={24} className="transition-transform duration-300 transform rotate-90" />
          ) : (
            <Menu size={24} className="transition-transform duration-300" />
          )}
        </motion.button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="md:hidden fixed inset-0 top-16 bg-navy-dark/95 backdrop-blur-lg p-6 flex flex-col justify-center items-center space-y-8 z-40"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navLinks.map((link, index) => (
              <motion.a 
                key={link.name}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                href={link.href.startsWith('#') ? link.href : undefined}
                className="nav-link font-mono text-lg tracking-wider"
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const element = document.querySelector(link.href);
                    if (element) {
                      setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <span className="text-accent mr-1">{index + 1}.</span> {link.name}
              </motion.a>
            ))}
            
            <motion.div
              custom={navLinks.length}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent/10 px-8 py-2"
                >
                  Resume
                </Button>
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
