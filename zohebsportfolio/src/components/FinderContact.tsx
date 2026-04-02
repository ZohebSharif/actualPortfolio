import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/zohebsharif/',
    color: '#0A66C2',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/zohebsharif/',
    color: '#6e5494',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:sharifzoheb@gmail.com',
    color: '#EA4335',
  },
];

const FinderContact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    emailjs.init('ahKG-bCTk5AKgX4mD');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const form = formRef.current;
    const honeypot = form.querySelector('input[name="website"]') as HTMLInputElement;
    if (honeypot && honeypot.value) {
      setStatus('success');
      form.reset();
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      from_name: (form.elements.namedItem('from_name') as HTMLInputElement)?.value,
      reply_to: (form.elements.namedItem('reply_to') as HTMLInputElement)?.value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement)?.value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value,
    };

    emailjs
      .send('service_5bs4gup', 'template_a5jee4c', templateParams)
      .then(() => {
        setStatus('success');
        form.reset();
      })
      .catch(() => {
        setStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.15s',
  };

  return (
    <div className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Connect
          </h3>

          <div className="space-y-2.5">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${link.color}22` }}
                >
                  <link.icon size={18} style={{ color: link.color }} />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {link.name}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {link.url.replace('mailto:', '').replace('https://www.', '').replace('https://', '')}
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,149,0,0.15)' }}
              >
                <svg className="w-4 h-4" style={{ color: '#ff9500' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Resume
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Download CV
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Send a Message
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3 p-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <input name="from_name" required placeholder="Your Name" style={inputStyle} />
            <div style={{ display: 'none' }}>
              <input name="website" />
            </div>
            <input name="reply_to" type="email" required placeholder="Email Address" style={inputStyle} />
            <input name="subject" placeholder="Subject" style={inputStyle} />
            <textarea
              name="message"
              required
              placeholder="How can I help you?"
              rows={4}
              style={{ ...inputStyle, resize: 'none' }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              style={{
                background: '#007aff',
                color: 'white',
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'success' && (
              <p className="text-xs text-center" style={{ color: '#34c759' }}>
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-center" style={{ color: '#ff3b30' }}>
                Failed to send. Please try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FinderContact;
