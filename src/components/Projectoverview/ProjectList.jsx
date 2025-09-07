import React from 'react'
import './projectList.css'

// SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
  </svg>
)

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
)

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
)

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      title: "Figma Design System",
      description: "UI component library for design system",
      status: "In Progress",
      statusColor: "yellow",
      deadline: "Nov 15, 2023",
      progress: 65,
      team: [
        { name: "John", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
        { name: "Sarah", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
        { name: "Mike", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
      ],
      tasks: 24,
      activities: 125,
      client: "Acme Inc.",
      budget: "$12,500",
      startDate: "Oct 1, 2023",
      priority: "High",
      priorityColor: "red",
      starred: true
    },
    {
      id: 2,
      title: "Keep React",
      description: "React component library",
      status: "Planning",
      statusColor: "blue",
      deadline: "Dec 5, 2023",
      progress: 25,
      team: [
        { name: "John", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
        { name: "Sarah", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
        { name: "Mike", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
      ],
      tasks: 10,
      activities: 86,
      client: "TechCorp",
      budget: "$18,000",
      startDate: "Oct 15, 2023",
      priority: "Medium",
      priorityColor: "yellow",
      starred: false
    },
    {
      id: 3,
      title: "StaticMania",
      description: "Static site generator",
      status: "Completed",
      statusColor: "green",
      deadline: "Oct 25, 2023",
      progress: 100,
      team: [
        { name: "John", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
        { name: "Sarah", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
        { name: "Mike", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
      ],
      tasks: 32,
      activities: 214,
      client: "StaticMania",
      budget: "$9,000",
      startDate: "Sep 5, 2023",
      priority: "Medium",
      priorityColor: "yellow",
      starred: false
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Cross-platform mobile application",
      status: "In Progress",
      statusColor: "yellow",
      deadline: "Dec 20, 2023",
      progress: 42,
      team: [
        { name: "John", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
        { name: "Sarah", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
        { name: "Mike", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
      ],
      tasks: 45,
      activities: 156,
      client: "MobiTech",
      budget: "$32,000",
      startDate: "Sep 15, 2023",
      priority: "High",
      priorityColor: "red",
      starred: false
    },
    {
      id: 5,
      title: "E-commerce Platform",
      description: "Online shopping platform",
      status: "On Hold",
      statusColor: "gray",
      deadline: "Jan 10, 2024",
      progress: 30,
      team: [
        { name: "John", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
        { name: "Sarah", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
        { name: "Mike", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
      ],
      tasks: 38,
      activities: 92,
      client: "ShopNow Inc.",
      budget: "$34,500",
      startDate: "Oct 5, 2023",
      priority: "Low",
      priorityColor: "green",
      starred: false
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Data visualization dashboard",
      status: "Planning",
      statusColor: "blue",
      deadline: "Jan 25, 2024",
      progress: 15,
      team: [
        { name: "Alex", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" },
        { name: "Emma", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" }
      ],
      tasks: 22,
      activities: 48,
      client: "DataViz Corp.",
      budget: "$16,800",
      startDate: "Nov 1, 2023",
      priority: "Medium",
      priorityColor: "yellow",
      starred: false
    }
  ]

  return (
    <div className="all-projects-container">
      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div className="breadcrumb">/ Employee / All Projects</div>
          <h1>All Projects</h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-container">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="search-input"
            />
          </div>
       
          <div className="filter-container">
            <button className="filter-btn">
              <FilterIcon />
              All Projects
            </button>
          </div>
          <div className="view-toggles">
            <button className="view-btn active">
              <GridIcon />
              Grid
            </button>
            <button className="view-btn">
              <ListIcon />
              List
            </button>
          </div>

          
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className={`project-header ${project.statusColor}`}>
                <div className="project-title-section">
                  <h3 className="project-title">
                    {project.title}
                    {project.starred && <span className="star"><StarIcon /></span>}
                  </h3>
                  <p className="project-description">{project.description}</p>
                  <div className={`status-tag ${project.statusColor}`}>
                    {project.status}
                  </div>
                </div>
                <div className="more-options">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
              </div>
              
              <div className="project-details">
                <div className="deadline-row">
                  <div className="detail-row">
                    <span className="detail-icon">
                      <CalendarIcon />
                    </span>
                    <span>Deadline: {project.deadline}</span>
                  </div>
                </div>
                
                <div className="progress-container">
                  <div className="progress-label">Progress</div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${project.progress}%`}}
                      ></div>
                    </div>
                    <div className="progress-percentage">{project.progress}%</div>
                  </div>
                </div>
                
                <div className="team-activity-section">
                  <div className="team-images">
                    {project.team.map((member, index) => (
                      <img 
                        key={index} 
                        src={member.image} 
                        alt={member.name}
                        className="image"
                      />
                    ))}
                  </div>
                  
                  <div className="activity-info">
                    <div className="activity-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                      <span>{project.tasks} tasks</span>
                    </div>
                    <div className="activity-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18"></path>
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                      </svg>
                      <span>{project.activities} activities</span>
                    </div>
                  </div>
                </div>
                
                <div className="project-meta">
                  <div className="meta-column">
                    <div className="meta-item">
                      <span className="meta-label">Client</span>
                      <span className="meta-value">{project.client}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Start Date</span>
                      <span className="meta-value">{project.startDate}</span>
                    </div>
                  </div>
                  <div className="meta-column">
                    <div className="meta-item">
                      <span className="meta-label">Budget</span>
                      <span className="meta-value">{project.budget}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Priority</span>
                      <div className={`priority-tag ${project.priorityColor}`}>
                        {project.priority}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectList
