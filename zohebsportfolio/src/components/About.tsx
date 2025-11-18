import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Skills with categories
  const skillCategories = [
    {
      name: "Languages",
      skills: ["C/C++", "Python", "MIPS", "JavaScript", "UNIX", "Java", "Zig", "TypeScript", "R"]
    },
    {
      name: "Frameworks",
      skills: ["React", "Flask", "PyTorch", "Express.js", "Tailwind"]
    },
    {
      name: "Tools",
      skills: ["Github", "Git", "Figma", "AWS", "Google Cloud", "Vite", "Firebase", "Supabase"]
    },
    {
      name: "Other",
      skills: ["Agile", "Object Oriented Programming", "Web Design", "APIs", "Frontend Development", "AI", "Machine Learning", "Testing"]
    }
  ];

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
    <section id="about" className="section-padding py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute top-40 left-1/4 w-1 h-40 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0"></div>
        <div className="hidden md:block absolute bottom-40 right-1/4 w-1 h-40 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="text-accent font-mono mr-2">01.</span> About Me
        </motion.h2>
        
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 space-y-4"
          >
        
            
           


            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h3 className="text-xl font-semibold text-slate-light mt-8 mb-4">Technical Expertise</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {skillCategories.map((category) => (
                  <motion.div key={category.name} variants={item} className="glass-card p-4 rounded-lg">
                    <h4 className="font-mono text-accent mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 text-xs bg-navy rounded border border-accent/30 text-slate-light">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2"
          >
            <div className="relative group">
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-accent to-secondary opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
              <div className="relative aspect-[3/4] md:aspect-[2/3] bg-navy-light rounded-lg overflow-hidden border border-accent/20">
                <img
                  src="zohebsharif.webp"
                  alt="Zoheb Sharif"
                  className="w-full h-full object-cover object-center brightness-90 hover:brightness-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-accent/10 hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 border-r-2 border-b-2 border-accent opacity-60"></div>
              <div className="absolute -top-2 -left-2 w-24 h-24 border-l-2 border-t-2 border-accent opacity-60"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
