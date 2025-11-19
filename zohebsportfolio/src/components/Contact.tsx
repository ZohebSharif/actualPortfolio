import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init("ahKG-bCTk5AKgX4mD");
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Check if the honeypot field is filled (spam bot)
    const form = formRef.current;
    const honeypotField = form.querySelector('input[name="website"]') as HTMLInputElement;
    
    if (honeypotField && honeypotField.value) {
      console.log('Spam submission detected');
      // Pretend to submit the form but don't actually send the email
      setTimeout(() => {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          className: "bg-accent/10 border-accent/20 text-slate-light",
        });
        form.reset();
      }, 1000);
      return;
    }
    
    setIsSubmitting(true);
    
    // Display environment information for debugging
    console.log('Environment:', import.meta.env.MODE);
    

    
    const serviceId = 'service_5bs4gup';
    const templateId = 'template_a5jee4c'; 
    
    // Log form data to help diagnose issues
    const formData = {
      name: (form.elements.namedItem('from_name') as HTMLInputElement)?.value,
      email: (form.elements.namedItem('reply_to') as HTMLInputElement)?.value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement)?.value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value
    };
    
    console.log('Sending form data:', formData);

    // Create template parameters from form data
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message
    };
    
    // Using emailjs.send with updated v4 syntax
    emailjs.send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          className: "bg-accent/10 border-accent/20 text-slate-light",
        });
        
        // Reset form
        form.reset();
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        
        // Fall back to form method if direct send fails
        console.log('Trying form method as fallback');
        return emailjs.sendForm(serviceId, templateId, form);
      })
      .then((response) => {
        if (response) {
          console.log('SUCCESS with form method!', response.status, response.text);
          toast({
            title: "Message sent!",
            description: "Thank you for reaching out. I'll get back to you soon.",
            className: "bg-accent/10 border-accent/20 text-slate-light",
          });
          
          // Reset form
          form.reset();
        }
      })
      .catch((error) => {
        console.error('All send methods failed:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        
        // Provide more specific error messages based on error type
        let errorMessage = "There was a problem sending your message. Please try again later.";
        
        if (error.status === 400) {
          errorMessage = "Invalid form data. Please make sure all fields are filled correctly and try again.";
        } else if (error.status === 403) {
          errorMessage = "Access denied. Please try again later.";
        } else if (error.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        }
        
        toast({
          title: "Message failed to send",
          description: errorMessage,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/zohebsharif/',
      color: '#0A66C2'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/zohebsharif/',
      color: '#6e5494'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:sharifzoheb@gmail.com',
      color: '#EA4335'
    },
  ];

  return (
    <section id="contact" className="section-padding pt-32 md:pt-40 py-24 pb-48 md:pb-56 relative -mt-20 md:-mt-28 lg:-mt-36">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="hidden lg:block absolute -top-10 right-1/4 w-1 h-40 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          <span className="text-accent font-mono mr-2">05.</span> Get In Touch
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-xl border-l-4 border-accent">
              <h3 className="text-2xl font-semibold mb-3 text-slate-light gradient-text">Let's Connect!</h3>
              <p className="text-slate">
                Whether you have a project idea, job opportunity, or just want to say hello, I'd love to hear from you. I'm always open to discussing new possibilities and collaborations.
              </p>
            </div>
            
            <div className="space-y-6">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 glass-card rounded-lg overflow-hidden group relative"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.2 }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-150"
                    style={{ backgroundColor: link.color }}
                  ></div>
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mr-4 border border-accent/30">
                    <link.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-slate-light font-semibold">{link.name}</h4>
                    <p className="text-sm text-accent hover:underline">{link.url.replace('mailto:', '')}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <span className="text-accent text-sm">Connect →</span>
                  </div>
                </motion.a>
              ))}
              
              <motion.div 
                className="p-4 glass-card rounded-lg overflow-hidden group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-150 bg-accent"
                ></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mr-4 border border-accent/30">
                    <svg className="w-5 h-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-slate-light font-semibold">Resume</h4>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">Download CV</a>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <span className="text-accent text-sm">View →</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-6 rounded-xl border border-accent/20">
              <h3 className="text-xl font-semibold mb-4 text-slate-light">Send me a message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-light mb-1 font-mono">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    name="from_name" 
                    required 
                    placeholder="John Doe"
                    className="bg-navy border-muted focus:border-accent/50 focus:ring-accent/30"
                  />
                </div>
                
                <div style={{ display: 'none' }}>
                  <label htmlFor="website">Website (Leave this empty)</label>
                  <input id="website" name="website" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-light mb-1 font-mono">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    name="reply_to" 
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    className="bg-navy border-muted focus:border-accent/50 focus:ring-accent/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-light mb-1 font-mono">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Project Inquiry"
                    className="bg-navy border-muted focus:border-accent/50 focus:ring-accent/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-light mb-1 font-mono">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required 
                    placeholder="How can I help you?"
                    className="bg-navy border-muted focus:border-accent/50 focus:ring-accent/30 min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full relative overflow-hidden group bg-navy border border-accent hover:bg-accent/10 text-slate-light"
                  disabled={isSubmitting}
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-accent rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
