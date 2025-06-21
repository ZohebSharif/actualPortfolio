import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, GraduationCap, BarChart3, Sparkles } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  icon: React.ReactNode;
}

const Experience = () => {
  // Real work experiences with enhanced descriptions
  const experiences: ExperienceItem[] = [
    {
      title: "Research Software Engineering Intern",
      company: "Lawrence Berkeley National Labs",
      location: "Berkeley, CA",
      duration: "June 2025 - Present",
      description: [
        "Architected and implemented an interactive scientific visualization web application using React, enabling researchers to gain deeper insights from complex beamline data",
        "Engineered high-performance data visualization components that process and render large scientific datasets with minimal latency",
        "Collaborated closely with leading scientists to translate complex scientific requirements into intuitive user interfaces that accelerate research outcomes",
        "Applied advanced frontend development techniques to create responsive visualizations that maintain clarity across different screen sizes and devices"
      ],
      icon: <Microscope className="h-5 w-5 text-accent" />
    },
    {
      title: "Leader Teaching Assistant (CS)",
      company: "The Stem Lab - CSU East Bay",
      location: "Hayward, CA",
      duration: "August 2024 - Present",
      description: [
        "Spearheaded the improvement of student performance by 45% through development of tailored educational strategies and personalized learning plans",
        "Mentored and led a team of learning assistants, implementing best practices that enhanced both teaching quality and student engagement",
        "Created innovative teaching resources for Data Structures and Software Engineering courses that helped students master complex computer science concepts",
        "Established an inclusive learning environment that fostered student confidence and produced measurable improvements in academic outcomes"
      ],
      icon: <GraduationCap className="h-5 w-5 text-accent" />
    },
    {
      title: "Student Researcher Intern",
      company: "Mathematics Engineering Science Achievement (MESA)",
      location: "Hayward, CA",
      duration: "June 2024 - October 2024",
      description: [
        "Conducted sophisticated statistical analysis using R, developing linear regression models that revealed previously unidentified trends in research data",
        "Implemented advanced data validation techniques that significantly improved the reliability and accuracy of research findings",
        "Delivered a compelling research presentation that effectively communicated complex statistical concepts to diverse audience groups",
        "Applied programming skills to create automated data processing workflows that streamlined the research methodology"
      ],
      icon: <BarChart3 className="h-5 w-5 text-accent" />
    },
    {
      title: "Augmented Reality Intern",
      company: "Snap Inc.",
      location: "Remote",
      duration: "March 2024 - April 2024",
      description: [
        "Rapidly mastered Snap's proprietary AR development tools, demonstrating exceptional technical adaptability and learning ability",
        "Designed and developed immersive augmented reality experiences that seamlessly blended digital elements with the physical world",
        "Collaborated with creative teams to transform conceptual ideas into engaging AR encounters using 2D/3D assets and interactive elements",
        "Gained comprehensive understanding of the AR ecosystem and digital storytelling principles that power next-generation user experiences"
      ],
      icon: <Sparkles className="h-5 w-5 text-accent" />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const cardHover = {
    rest: { scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <section id="experience" className="section-padding py-24 relative overflow-hidden bg-navy">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute top-1/3 left-1/4 w-1 h-40 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0"></div>
        <div className="hidden md:block absolute bottom-1/3 right-1/4 w-1 h-40 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-accent/5 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="text-accent font-mono mr-2">03.</span> Work Experience
        </motion.h2>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 relative"
        >
          {/* Grid Layout for Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="relative"
            >              
              {/* Content card */}
              <motion.div 
                className="h-full"
                initial="rest"
                whileHover="hover"
                variants={cardHover}
              >
                <div className="glass-card p-7 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-accent/15 h-full backdrop-blur-sm bg-navy-light/30 hover:bg-navy-light/40">
                  {/* Card Header with Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-navy-light border border-accent/40 flex items-center justify-center shadow-md shadow-accent/10">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center">
                          {exp.icon}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-light font-mono text-sm block">{exp.duration}</span>
                        <span className="text-slate text-xs block mt-0.5">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <h3 className="text-xl font-semibold text-slate-light">{exp.title}</h3>
                    <h4 className="text-accent mt-1 font-medium">{exp.company}</h4>
                  </div>
                  
                  <ul className="space-y-3 text-slate">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-accent mr-2 mt-1 opacity-80">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
