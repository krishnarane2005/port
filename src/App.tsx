import React, { useEffect, useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Code2,
  Briefcase,
  User2,
  MessageSquare,
  FileText,
  Database,
  Server,
  Brain,
  Heart,
} from 'lucide-react';
import Typewriter from 'typewriter-effect';
import emailjs from '@emailjs/browser';
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false,
    isSubmitting: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Please fill in all required fields',
        isError: true,
        isSubmitting: false,
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        message: 'Please enter a valid email address',
        isError: true,
        isSubmitting: false,
      });
      return;
    }

    setFormStatus({
      message: '',
      isError: false,
      isSubmitting: true
    });

    try {
      await emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'New message from portfolio',
          message: formData.message,
        }
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        setFormStatus({
          message: 'Message sent successfully!',
          isError: false,
          isSubmitting: false,
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
    } catch (error) {
      let errorMessage = 'Failed to send message';
      if (error instanceof Error) {
        console.error('Full error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        errorMessage = error.message.includes('429')
          ? 'Too many attempts. Please wait a few minutes.'
          : `Error: ${error.message}`;
      }

      setFormStatus({
        message: errorMessage,
        isError: true,
        isSubmitting: false,
      });
    }
  }
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3]">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider">
              KRISHNA RANE
            </h1>
            <div className="text-xl md:text-2xl text-gray-200 mb-8">
              <Typewriter
                options={{
                  strings: [
                    'Frontend Developer',
                    'UI/UX Enthusiast',
                    'Problem Solver',
                    'Tech Explorer',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </div>
          </div>
          <div className="flex justify-center space-x-6 mb-12 fade-in">
            <a
              href="https://github.com/krishnarane2005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-rane-136a98296/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:krishnarane2005@gmail.com"
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>
          <div className="flex justify-center gap-4 mb-12 fade-in">
            <button
              onClick={() => window.open('/Resume.1.pdf')}
              className="bg-transparent hover:bg-white text-white hover:text-gray-900 font-semibold py-3 px-8 border-2 border-white hover:border-transparent rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <FileText size={20} />
              Download CV
            </button>
            <a
              href="#contact"
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Mail size={20} />
              Contact Me
            </a>
          </div>
          <a
            href="#about"
            className="animate-bounce inline-block text-white hover:text-gray-300 transition-colors"
          >
            <ChevronDown size={32} />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="animate-on-scroll opacity-0">
            <p className="text-xl text-center text-gray-600 mb-4">
              Get To Know More
            </p>
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              About Me
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 animate-on-scroll opacity-0 slide-in-left">
              <img
                src="https://i.postimg.cc/057sKLNs/IMG20240309170845.jpg"
                alt="Krishna Rane"
                className="profile-image w-full max-w-[400px] h-auto mx-auto object-cover shadow-lg rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 animate-on-scroll opacity-0 slide-in-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-gray-50 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:bg-white">
                  <h3 className="font-semibold text-lg mb-2">Experience</h3>
                  <p className="text-gray-600">
                    1+ year
                    <br />
                    Frontend Development
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:bg-white">
                  <h3 className="font-semibold text-lg mb-2">Education</h3>
                  <p className="text-gray-600">
                    B.Tech Pursuing
                    <br />
                    MIT Academy of Engineering
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                I am a passionate frontend developer and tech enthusiast currently
                pursuing my B.Tech at MIT Academy of Engineering. With a keen eye for
                design and a love for creating seamless user experiences, I specialize
                in building modern web applications using React, Tailwind CSS, and
                other cutting-edge technologies.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                Beyond coding, I'm deeply interested in UI/UX design principles and
                constantly explore new technologies to stay at the forefront of web
                development. My goal is to create digital experiences that not only
                look beautiful but also solve real-world problems effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="animate-on-scroll opacity-0">
            <p className="text-xl text-center text-gray-600 mb-4">
              Technical Expertise
            </p>
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              My Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Frontend Development */}
            <div className="skill-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Code2 className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Frontend Development</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">React.js</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full progress-bar"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Tailwind CSS</span>
                    <span className="text-sm text-gray-600">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full progress-bar"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">TypeScript</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full progress-bar"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Development */}
            <div className="skill-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <Server className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Backend Development</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Node.js</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full progress-bar"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">MongoDB</span>
                    <span className="text-sm text-gray-600">70%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full progress-bar"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">SQL</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full progress-bar"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="skill-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Brain className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Programming</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">C++</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full progress-bar"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Python</span>
                    <span className="text-sm text-gray-600">70%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full progress-bar"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">C</span>
                    <span className="text-sm text-gray-600">80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full progress-bar"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="animate-on-scroll opacity-0">
            <p className="text-xl text-center text-gray-600 mb-4">Explore My</p>
            <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="experience-card">
              <h3 className="text-2xl font-semibold mb-6">
                Frontend Development
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Code2 className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">React.js Development</h4>
                    <p className="text-gray-600">
                      Building modern, responsive web applications with React
                      and its ecosystem
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Code2 className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">UI/UX Implementation</h4>
                    <p className="text-gray-600">
                      Creating beautiful user interfaces with Tailwind CSS and
                      modern design principles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Code2 className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">TypeScript</h4>
                    <p className="text-gray-600">
                      Developing type-safe applications with enhanced code
                      quality
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="experience-card">
              <h3 className="text-2xl font-semibold mb-6">
                Backend & Other Skills
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Server className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Node.js & Express</h4>
                    <p className="text-gray-600">
                      Building scalable backend services and REST APIs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Database className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Database Management</h4>
                    <p className="text-gray-600">
                      Working with MongoDB and SQL databases
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Brain className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Problem Solving</h4>
                    <p className="text-gray-600">
                      Data Structures and Algorithms in C++ and Python
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="animate-on-scroll opacity-0">
            <p className="text-xl text-center text-gray-600 mb-4">
              Browse My Recent
            </p>
            <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Project 1: Student Performance Analysis */}
            <a
              href="https://github.com/krishnarane2005/student-performance-analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=300"
                  alt="Student Performance Analysis"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Student Performance Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  A web application project that evaluates student performance based on various factors like there make MSE ,ESE,CA and IA. Built using React, TypeScript, and SQL.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      React
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      SQL
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Github size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Project 2: Personal Portfolio */}
            <a
              href="https://github.com/krishnarane2005/port"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=300"
                  alt="Personal Portfolio"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Personal Portfolio
                </h3>
                <p className="text-gray-600 mb-4">
                  A responsive personal portfolio website showcasing my skills, projects, and contact information. Built with React, Tailwind CSS, and deployed on GitHub Pages.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      React
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      GitHub Pages
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Github size={20} />
                    </div>
                    <div className="text-gray-600 hover:text-gray-900 transition-colors">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="animate-on-scroll opacity-0">
            <p className="text-xl text-center text-gray-600 mb-4">
              Get in Touch
            </p>
            <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                href="mailto:krishnarane2005@gmail.com"
                className="contact-card"
              >
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <Mail className="text-indigo-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600 mb-4">krishnarane2005@gmail.com</p>
                <span className="text-indigo-600 font-medium flex items-center gap-2">
                  Write me an email <ExternalLink size={16} />
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-rane-136a98296/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Linkedin className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-600 mb-4">
                  Let's connect professionally
                </p>
                <span className="text-blue-600 font-medium flex items-center gap-2">
                  View Profile <ExternalLink size={16} />
                </span>
              </a>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-input"
                      placeholder="Tell me your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-input"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="contact-input"
                    placeholder="How can I help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="contact-input min-h-[150px]"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                {formStatus.message && (
                  <div
                    className={`text-center p-3 rounded-lg ${formStatus.isError
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                      }`}
                  >
                    {formStatus.message}
                  </div>
                )}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`contact-button ${formStatus.isSubmitting
                      ? 'opacity-75 cursor-not-allowed'
                      : ''
                      }`}
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">
                KRISHNA RANE
              </h3>
              <p className="text-gray-400">
                Transforming ideas into elegant digital solutions
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <Mail className="inline-block mr-2" size={16} />
                  krishnarane2005@gmail.com
                </p>
                <p className="text-gray-400">
                  <Briefcase className="inline-block mr-2" size={16} />
                  Open for opportunities
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} KRISHNA RANE. All rights
                reserved.
              </p>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="text-red-500" size={16} />
                <span>using React & Tailwind CSS</span>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="https://github.com/krishnarane2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/krishna-rane-136a98296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:krishnarane2005@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Navigation */}
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg z-50">
        <ul className="flex space-x-8">
          <li>
            <a
              href="#about"
              className="nav-item text-gray-600 flex flex-col items-center"
            >
              <User2 size={20} />
              <span className="text-xs mt-1">About</span>
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="nav-item text-gray-600 flex flex-col items-center"
            >
              <Code2 size={20} />
              <span className="text-xs mt-1">Experience</span>
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="nav-item text-gray-600 flex flex-col items-center"
            >
              <Briefcase size={20} />
              <span className="text-xs mt-1">Projects</span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-item text-gray-600 flex flex-col items-center"
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

// export default App
