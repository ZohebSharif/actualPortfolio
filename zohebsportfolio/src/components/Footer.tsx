
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark py-12 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="text-accent font-mono text-2xl font-medium mb-2">
              zohebsharif<span className="text-slate-light">.com</span>
            </div>
            <p className="text-sm text-slate">
              Creating innovative software
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <a 
              href="https://github.com/zohebsharif/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate hover:text-accent transition-colors relative group"
              aria-label="GitHub"
            >
              <span className="absolute -inset-2 bg-accent/10 scale-0 rounded-full group-hover:scale-100 transition-transform"></span>
              <Github size={20} className="relative" />
            </a>
            <a 
              href="https://www.linkedin.com/in/zohebsharif/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate hover:text-accent transition-colors relative group"
              aria-label="LinkedIn"
            >
              <span className="absolute -inset-2 bg-accent/10 scale-0 rounded-full group-hover:scale-100 transition-transform"></span>
              <Linkedin size={20} className="relative" />
            </a>
            <a 
              href="mailto:sharifzoheb@gmail.com" 
              className="text-slate hover:text-accent transition-colors relative group"
              aria-label="Email"
            >
              <span className="absolute -inset-2 bg-accent/10 scale-0 rounded-full group-hover:scale-100 transition-transform"></span>
              <Mail size={20} className="relative" />
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-dark"
        >
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
