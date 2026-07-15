import './App.css';
import { useLayoutEffect, useRef, useState } from 'react';
import projects from './data/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faSms } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

function App() {




  const [professionalMode, setProfessionalMode] = useState(true);
  const [projectsList, setProjectsList] = useState(projects.slice(0, 3));
  const [showAllProjects, setShowAllProjects] = useState(false);
  const pageRef = useRef(null);


  const goToProject = (link) => {
    window.open(link, '_blank');
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.project-card', { y: 20, opacity: 0 });
      gsap.set('.connect-links a', { y: 16, opacity: 0, scale: 0.9 });

      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTimeline
        .from('.home-wrapper h1', { y: -24, opacity: 0, duration: 0.8 })
        .from('.title', { y: -14, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.headshot-wrapper', { scale: 0.7, opacity: 0, rotate: -8, duration: 0.85 }, '-=0.45')
        .from('.bio', { y: 18, opacity: 0, stagger: 0.14, duration: 0.65 }, '-=0.5')
        .from('.projects-wrapper h3', { y: 10, opacity: 0, duration: 0.55 }, '-=0.2')
        .to('.project-card', { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, '-=0.15')
        .to('.connect-links a', { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.45 }, '-=0.25');

      gsap.to(['.home-wrapper', '.connect-wrapper'], {
        backgroundPosition: '100% 50%',
        duration: 9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: 'power3.out' }
      );

      const cards = gsap.utils.toArray('.project-card');
      const listeners = cards.map((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -7,
            scale: 1.01,
            boxShadow: '0px 14px 24px rgba(0, 0, 0, 0.18)',
            duration: 0.24,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            duration: 0.24,
            ease: 'power2.out'
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return { card, handleMouseEnter, handleMouseLeave };
      });

      return () => {
        listeners.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, pageRef);

    return () => ctx.revert();
  }, [projectsList]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.connect-links a',
        { y: 12, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [professionalMode]);

  useLayoutEffect(() => {
    if (showAllProjects) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.show-all-projects-button',
        { y: 0, scale: 1 },
        {
          y: -3,
          scale: 1.04,
          duration: 0.9,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [showAllProjects]);

  return (
    <div ref={pageRef}><div className="home-wrapper">
      <h1>Michael Montgomery</h1>
      <p className='title'>Senior Software Engineer at Johns Hopkins University</p>
      <div className="headshot-wrapper"></div>
      <p className='bio'>Michael joined Johns Hopkins University as a Senior Software Engineer in October 2024. Prior to this, he worked with companies like Boeing, Universal Orlando, Disney and L3Harris among others. At Johns Hopkins University, Michael has done work to support the <a href="https://cde.govex.jhu.edu/">City Data Explorer</a> (a unique tool, offering an interactive look into highly granular data related to larger cities in the United States), was the lead engineer on the <a href="https://govex.jhu.edu/ai-capacity-quiz/">AI Capacity Quiz project</a> and currently works to drive the University’s various AI initiatives forward.</p>
      <p className='bio'>Please feel free to reach out. I would love to hear from you!</p>

    </div>
      <div className='projects-wrapper'>
        <h3>Projects {showAllProjects ? <span>{projectsList.length}</span> : ''}</h3>
       {
        showAllProjects && (
           <input type="text" placeholder="Search projects..." onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredProjects = projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.company.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
          setProjectsList(filteredProjects);
        }} />
        )
       }
        {projectsList.map((project, index) => (
          <div key={index} className='project-card' onClick={() => goToProject(project.link)}>
            <h4>{project.title} <span className='company'>{project.company}</span></h4>
            <p>{project.description}</p>
            {/* <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a> */}
            {/* <p>Company: {project.company}</p> */}
            <div className='tags'>
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className='tag'>{tag}</span>
              ))}
            </div>
          </div>
        ))}
        {
          !showAllProjects && projectsList.length >= 3 && (
            <button onClick={() => {
              setProjectsList(projects);
              setShowAllProjects(true);
            }} className="show-all-projects-button">Show All Projects</button>
          )
        }
      </div>
      <div className="connect-wrapper">
        <h3>Connect</h3>
        <select onChange={(e) => setProfessionalMode(e.target.value === 'professional')}>
          <option value="professional">Professional</option>
          <option value="casual">Personal</option>
        </select>
        {/* <p className='connect-text'>{professionalMode ? "Feel free to connect with me on LinkedIn, send me a text or check out my GitHub profile." : "Feel free to connect with me on LinkedIn, send me a text or check out my GitHub profile."}</p> */}
        <div className="connect-links">

          {
            professionalMode && (
              <a href="mailto:michael.montgomery@jhu.edu" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faEnvelope} /></a>
            )
          } 
          

          {
            professionalMode && (
              <a href="https://www.linkedin.com/in/meanstackmichael/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
            )
          }
          {!professionalMode && (
            <a href="sms:+13214661405" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faSms} /></a>

          )}

          {!professionalMode && (
            <a href="https://www.instagram.com/foiemardigras/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          )}

          {professionalMode && (
            <a href="https://github.com/Michael-Montgomery" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
          )}


        </div>
      </div>
    </div>
  );
}

export default App;
