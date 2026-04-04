import Card from './Card'
import Button from './Button'
import reactIcon from '../assets/program-icons/react.svg'
import nodeIcon from '../assets/program-icons/nodejs.svg'
import mongoIcon from '../assets/program-icons/mongodb.svg'
import expressIcon from '../assets/program-icons/express.svg'
import javaIcon from '../assets/program-icons/java.svg'
import springIcon from '../assets/program-icons/spring.svg'
import mysqlIcon from '../assets/program-icons/mysql.svg'
import pythonIcon from '../assets/program-icons/python.svg'
import cIcon from '../assets/program-icons/c.svg'
import cppIcon from '../assets/program-icons/cpp.svg'
import htmlIcon from '../assets/program-icons/html.svg'
import cssIcon from '../assets/program-icons/css.svg'
import bootstrapIcon from '../assets/program-icons/bootstrap.svg'
import jsIcon from '../assets/program-icons/javascript.svg'

const techIconMap = {
  React: reactIcon,
  'Node.js': nodeIcon,
  MongoDB: mongoIcon,
  'Express.js': expressIcon,
  Java: javaIcon,
  'Spring Boot': springIcon,
  MySQL: mysqlIcon,
  Python: pythonIcon,
  C: cIcon,
  'C++': cppIcon,
  HTML: htmlIcon,
  CSS: cssIcon,
  Bootstrap: bootstrapIcon,
  JavaScript: jsIcon,
}

const programs = [
  {
    id: 'mern',
    title: 'MERN Stack Development',
    description:
      'Hands-on full-stack development with MongoDB, Express, React, and Node.js focused on deployable web applications.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    level: 'Beginner → Intermediate (placeholder)',
    duration: '12 weeks (placeholder)',
    outcome: 'Full-stack apps, deployment experience, and portfolio-ready projects',
    icon: reactIcon,
  },
  {
    id: 'java-springboot',
    title: 'Java & Spring Boot',
    description:
      'Backend engineering with Java and Spring Boot, building robust REST APIs and service-oriented systems using MySQL.',
    technologies: ['Java', 'Spring Boot', 'MySQL'],
    level: 'Beginner → Intermediate (placeholder)',
    duration: '12 weeks (placeholder)',
    outcome: 'Enterprise-style backend services and API integrations',
    icon: javaIcon,
  },
  {
    id: 'python-backend',
    title: 'Python Backend Development',
    description:
      'Practical backend development using Python: APIs, data handling, authentication, and deployment workflows.',
    technologies: ['Python', 'APIs', 'Authentication', 'Deployment basics'],
    level: 'Beginner → Intermediate (placeholder)',
    duration: '10 weeks (placeholder)',
    outcome: 'Production-ready backend services and integration experience',
    icon: pythonIcon,
  },
  {
    id: 'databases-sql',
    title: 'SQL & Databases',
    description:
      'Foundations of relational and document databases, schema design, queries, and practical data modeling with MySQL and MongoDB.',
    technologies: ['MySQL', 'MongoDB', 'Schema Design', 'Query Optimization'],
    level: 'Beginner → Intermediate (placeholder)',
    duration: '6 weeks (placeholder)',
    outcome: 'Database design skills, SQL proficiency, and practical data handling',
    icon: mysqlIcon,
  },
  {
    id: 'frontend',
    title: 'Front-End Development',
    description:
      'Practical front-end development focused on modern HTML, responsive CSS, Bootstrap, JavaScript, and React for polished interfaces.',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React'],
    level: 'Beginner → Intermediate (placeholder)',
    duration: '10 weeks (placeholder)',
    outcome: 'Responsive UIs, component-driven interfaces, and portfolio-ready front-end projects',
    icon: htmlIcon,
  },
]

function TrainingPrograms() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((p) => {
        const IconSrc = p.icon || reactIcon
        return (
          <Card key={p.id} className="flex flex-col h-full">
            <div className="mb-4 inline-flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1DA1FF]/35 bg-[#1DA1FF]/10 text-[#8BD8FF]">
                <img src={IconSrc} alt={`${p.title} icon`} className="h-6 w-6 object-contain" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#EAF0FF]">{p.title}</h3>
            </div>

            <p className="mt-1 text-sm text-[#A9B4D0]">{p.description}</p>

            <div className="mt-4">
              <p className="text-xs font-medium text-[#89D7FF]">Technologies covered</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-xs text-[#C3CCE2]"
                  >
                    {techIconMap[tech] ? (
                      <img src={techIconMap[tech]} alt={`${tech} icon`} className="h-3 w-3 object-contain" />
                    ) : null}
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-xs text-[#C3CCE2]">{p.level}</span>
              <span className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-xs text-[#C3CCE2]">{p.duration}</span>
            </div>

            <p className="mt-4 text-sm text-[#A9B4D0]">{p.outcome}</p>

            <div className="mt-auto pt-4">
              <Button to={`/training#apply`} variant="primary">
                Apply Now
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default TrainingPrograms
