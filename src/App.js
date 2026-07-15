import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import projects from './data/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faSms } from '@fortawesome/free-solid-svg-icons';

function App() {




  const [professionalMode, setProfessionalMode] = useState(true);
  const [projectsList, setProjectsList] = useState(projects);


  const goToProject = (link) => {
    window.open(link, '_blank');
  };

  return (
    <><div className="home-wrapper">
      <h1>Michael Montgomery</h1>
      <p className='title'>Senior Software Engineer at Johns Hopkins University</p>
      <div className="headshot-wrapper"></div>
      <p className='bio'>Michael joined Johns Hopkins University as a Senior Software Engineer in October 2024. Prior to this, he worked with companies like Boeing, Universal Orlando, Disney and L3Harris among others. At Johns Hopkins University, Michael has done work to support the <a href="https://cde.govex.jhu.edu/">City Data Explorer</a> (a unique tool, offering an interactive look into highly granular data related to larger cities in the United States), was the lead engineer on the <a href="https://govex.jhu.edu/ai-capacity-quiz/">AI Capacity Quiz project</a> and currently works to drive the University’s various AI initiatives forward.</p>
      <p className='bio'>Please feel free to reach out. I would love to hear from you!</p>

    </div>
      <div className='projects-wrapper'>
        <h3>Projects<span>{projectsList.length}</span></h3>
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
    </>
  );
}

export default App;
