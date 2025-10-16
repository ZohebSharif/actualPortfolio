import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Project } from '@/pages/Admin';
import { Github, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (project.demo) {
      // If demo starts with http or /, it's an external link
      if (project.demo.startsWith('http') || project.demo.startsWith('/')) {
        window.location.href = project.demo;
      } else {
        // Otherwise, navigate to the demo page
        navigate(`/demo/${project.id}`);
      }
    }
  };

  return (
    <Card className="overflow-hidden rounded-lg bg-navy border-muted transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg h-full flex flex-col">
      <div 
        className={`relative overflow-hidden ${project.id === '9' ? 'aspect-[4/3]' : 'aspect-video'} cursor-pointer`}
        onClick={() => navigate(`/demo/${project.id}`)}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full transition-transform duration-500 hover:scale-105 ${project.id === '9' ? 'object-contain bg-navy-dark p-2' : 'object-cover'}`}
        />
        {project.featured && (
          <div className="absolute top-2 right-2 bg-accent/80 text-navy-dark text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <CardContent className="py-4 flex-grow">
        <h3 
          className="text-xl font-semibold mb-2 text-slate-light hover:text-accent transition-colors cursor-pointer"
          onClick={() => navigate(`/demo/${project.id}`)}
        >
          {project.title}
        </h3>
        <p className="text-slate text-sm mb-4">
          {project.description}
        </p>
        
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-muted p-3">
        <div className="flex gap-3 text-slate">
          {project.github && (
            <a
              href={project.github}
              className="hover:text-accent transition-colors"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github size={20} />
            </a>
          )}
          {/* Always show demo link */}
          <a
            href="#"
            onClick={handleDemoClick}
            className="hover:text-accent transition-colors"
            aria-label={`View demo for ${project.title}`}
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
