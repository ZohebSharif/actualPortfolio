import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 pb-32 px-6 sm:px-12 md:px-24 animated-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-accent mb-6"
        >
          Hi, my name is
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-light mb-4 text-glow"
        >
          Zoheb Sharif.
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate mb-8"
        >
          I build <span className="gradient-text">innovative software</span>.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg text-slate max-w-xl mb-10"
        >
          I'm a Computer Science major and software engineer specializing in building 
          exceptional digital experiences. Currently, I'm focused on building accessible, 
          human-centered products.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-wrap gap-4"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden"
            onClick={() => {
              const projectsSection = document.querySelector('#projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="absolute inset-0 bg-accent/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10">Check out my work</span>
            <ArrowRight size={16} className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent/10 relative overflow-hidden before:absolute before:inset-0 before:bg-accent/5 before:scale-x-0 before:origin-left hover:before:scale-x-100 before:transition-transform before:duration-300"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="relative z-10">Get in touch</span>
          </Button>
        </motion.div>
      </div>
      
      {/* Animated Code Symbols */}
      <div className="absolute bottom-20 right-12 -z-10 opacity-20">
        <motion.div 
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="floating"
        >
          <div className="text-8xl sm:text-9xl font-bold gradient-text">&lt;/&gt;</div>
        </motion.div>
      </div>
      
      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div 
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
          }}
          className="w-6 h-9 border-2 border-accent/50 rounded-full flex justify-center pt-1"
        >
          <motion.div 
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, 12, 0]
            }} 
            transition={{ 
              repeat: Infinity, 
              duration: 2
            }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </motion.div>
        <span className="text-xs font-mono text-slate-dark mt-2">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
