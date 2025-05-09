import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Edit, Trash2, Image, Link, Code, ExternalLink } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import ProjectCard from '@/components/ProjectCard';

// Define project type
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  screenshots?: string[]; // Optional array of screenshot URLs
}

const Admin = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [github, setGithub] = useState('');
  const [demo, setDemo] = useState('');
  const [featured, setFeatured] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !image) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editingId ? {
          ...project,
          title,
          description,
          image,
          tags,
          github,
          demo,
          featured
        } : project
      ));
      toast({
        title: "Project updated",
        description: `${title} has been updated successfully`
      });
    } else {
      // Add new project
      const newProject: Project = {
        id: uuidv4(),
        title,
        description,
        image,
        tags,
        github,
        demo,
        featured
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Project added",
        description: `${title} has been added to your portfolio`
      });
    }

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setTags([]);
    setTagInput('');
    setGithub('');
    setDemo('');
    setFeatured(false);
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.image);
    setTags(project.tags);
    setGithub(project.github);
    setDemo(project.demo);
    setFeatured(project.featured);
    setEditingId(project.id);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    const projectToDelete = projects.find(p => p.id === id);
    if (!projectToDelete) return;

    if (confirm(`Are you sure you want to delete "${projectToDelete.title}"?`)) {
      setProjects(projects.filter(project => project.id !== id));
      toast({
        title: "Project deleted",
        description: `${projectToDelete.title} has been removed from your portfolio`
      });
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold gradient-text">Project Management</h1>
          <p className="text-slate">Add, edit and remove projects from your portfolio</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <Card className="bg-navy-light border-muted">
              <CardHeader>
                <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
                <CardDescription>
                  {editingId ? 'Make changes to your project' : 'Fill in the details to add a new project'}
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Project Title *
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="My Awesome Project"
                      className="bg-navy border-muted"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description *
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief description of your project"
                      className="bg-navy border-muted min-h-[120px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1">
                      Image URL *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-navy border-muted flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Image size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="React"
                        className="bg-navy border-muted flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={handleAddTag}>
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <div 
                            key={index}
                            className="bg-navy flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-slate hover:text-accent"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="github" className="block text-sm font-medium mb-1">
                        GitHub URL
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="github"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="https://github.com/username/repo"
                          className="bg-navy border-muted flex-1"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Code size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="demo" className="block text-sm font-medium mb-1">
                        Live Demo URL
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="demo"
                          value={demo}
                          onChange={(e) => setDemo(e.target.value)}
                          placeholder="https://myproject.com"
                          className="bg-navy border-muted flex-1"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <ExternalLink size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded border-muted bg-navy h-4 w-4"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Feature this project on homepage
                    </label>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingId ? 'Update Project' : 'Add Project'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Your Projects ({projects.length})
            </h2>
            
            {projects.length === 0 ? (
              <div className="bg-navy-light border border-muted rounded-lg p-8 text-center">
                <p className="text-slate mb-4">You haven't added any projects yet.</p>
                <p className="text-sm text-slate-dark">
                  Use the form to add your first project to your portfolio.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="relative">
                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                        className="h-8 w-8 bg-navy-light/80 backdrop-blur-sm"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(project.id)}
                        className="h-8 w-8 bg-navy-light/80 backdrop-blur-sm text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
