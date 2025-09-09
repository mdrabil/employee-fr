import React, { useState } from 'react'
import './project.css'
import { FaStar } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { RiFileListLine } from 'react-icons/ri';
import { VscGraph } from "react-icons/vsc";
import { CiCalendarDate, CiFilter } from "react-icons/ci";
import { formatDateFrontend } from '../../api/CustomApi';
import { useNavigate } from 'react-router-dom';
import { BiDownload } from 'react-icons/bi';
import { getStatusByColor, getStatusStyles } from '../../utils/progressReport';
/**
 * Project Component - projects overview 
 */
const Project = ({allProjects}) => {
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [editTask, setEditTask] = useState({
    title: '',
    project: '',
    priority: 'Medium',
    dueDate: '',
    description: '',
    assignee: '',
    subtasks: []
  });

  // Projects data 
  const projectsData = [
    {
      id: 'deorags',
      name: 'Deorags',
      description: 'UI component library for design system',
      status: 'In Progress',
      statusClass: 'in-progress',
      deadline: 'Nov 15, 2023',
      progress: 65,
      progressColor: '',
      tasks: 24,
      activities: 128,
      teamMembers: [
        'https://arawebtechnologies.com/assets/images/u1.png',
        'https://arawebtechnologies.com/assets/images/u1.png',
        'https://arawebtechnologies.com/assets/images/u1.png'
      ]
    },
    {
      id: 'force-strike',
      name: 'Force Strike',
      description: 'UI component library for design system',
      status: 'Planning',
      statusClass: 'planning',
      deadline: 'Nov 15, 2023',
      progress: 65,
      progressColor: 'blue',
      tasks: 24,
      activities: 128,
      teamMembers: [
        'https://arawebtechnologies.com/assets/images/u1.png',
        'https://arawebtechnologies.com/assets/images/u1.png',
        'https://arawebtechnologies.com/assets/images/u1.png'
      ]
    },
    {
      id: 'aarti-flames',
      name: 'Aarti Flames',
      description: 'Marketing website redesign project',
      status: 'Completed',
      statusClass: 'completed',
      deadline: 'Nov 15, 2023',
      progress: 65,
      progressColor: 'green',
      tasks: 24,
      activities: 128,
      teamMembers: [
        'https://arawebtechnologies.com/assets/images/u1.png',
        'https://arawebtechnologies.com/assets/images/u1.png',
        'https://arawebtechnologies.com/assets/images/u1.png'
      ]
    }
  ];

  /**
   * Project header section ko render karne ke liye
   * Isme title aur filter buttons hain
   */
  const renderProjectHeader = () => (
    <div className="project-header">
      <h3>Project Overview</h3>
      <div className="project-actions">
        <button className="filter-btn">
          {/* <i className="ri-filter-line"></i> */}
          <CiFilter />
          Filter
        </button>
        <button className="view-all-btn">View All</button>
      </div>
    </div>
  );

  const renderProjectCardHeader = (project) => (
    <div className="project-card-header">
      <div className="project-info">
        <div className="project-title">
          <span className="project-name">{project?.name}</span>
           <FaStar className='text-yellow-300'/>
        </div>
        <p className="project-description">{project?.description?.slice(0,15)}</p>
      </div>
      <div className={`rounded px-2 py-1 ${getStatusByColor(project?.status)}`}>{project?.status}</div>
    </div>
  );

  const toggleDropdown = (projectId) => {
    setShowDropdown(showDropdown === projectId ? null : projectId);
  };

  const handleProjectAction = (action, projectId) => {
    setShowDropdown(null);
    
    if (action === 'edit') {
      
   navigate(`/project-details/${projectId}`)
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProject(null);
    setEditTask({
      title: '',
      project: '',
      priority: 'Medium',
      dueDate: '',
      description: '',
      assignee: '',
      subtasks: []
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubtaskToggle = (subtaskId) => {
    setEditTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    }));
  };

  const addSubtask = () => {
    const newSubtask = {
      id: Date.now(),
      text: '',
      completed: false
    };
    setEditTask(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, newSubtask]
    }));
  };

  const updateSubtaskText = (subtaskId, text) => {
    setEditTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask =>
        subtask.id === subtaskId
          ? { ...subtask, text }
          : subtask
      )
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    closeEditModal();
  };

  const renderProjectDetails = (project) => (
    <div className="project-details">
      <div className="project-deadline">
        {/* <i className="ri-calendar-line"></i> */}
        <CiCalendarDate />
        <span>Deadline: {formatDateFrontend(project?.deadline,'date')}</span>
      </div>
      <div className="project-menu-container">
        <button 
          className="project-menu"
          onClick={() => toggleDropdown(project?._id)}
        >
         <IoMdMore/>
        </button>
        
        {/* Project Action Dropdown Menu */}
        {showDropdown === project?._id && (
          <div className="project-action-dropdown">
            <div className="project-action-item" onClick={() => handleProjectAction('edit', project?._id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              View Project
            </div>
            <div className="project-action-item" onClick={() => handleProjectAction('complete', project?._id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Mark as Completed
            </div>

                <div className="project-action-item" onClick={() => {
      // Create a temporary print container
      const printContent = document.createElement("div");
      printContent.innerHTML = project?.description.replace(/\n/g, "<br/>");
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Description</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; white-space: pre-line; }
            </style>
          </head>
          <body>${printContent.innerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }}
   
  >

  
            <BiDownload/>
              Download Doc
            </div>
                            

 
            {/* <div className="project-action-item" onClick={() => handleProjectAction('archive', project?._id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/>
              </svg>
              Archive Project
            </div> */}
            <div className="project-action-item delete" onClick={() => handleProjectAction('delete', project?._id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
              Delete Project
            </div>
          </div>
        )}
      </div>
    </div>
  );


  const renderProjectProgress = (project) => (
    <div className="project-progress">
      <div className="progress-info">
        <span>Progress</span>
        <span className="progress-percentage">{project.progress}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${project.progressColor}`} 
          style={{width: `${project.progress}%`}}
        ></div>
      </div>
    </div>
  );


  const renderProjectFooter = (project) => (
    <div className="project-footer">
 <div className="flex -space-x-3">
  {project?.employees?.map((member, index) => (
    <img
      key={index}
      src={`http://localhost:5000/api/${member?.profileImage}`}
      alt={`User ${index + 1}`}
      className="w-10 h-10 rounded-full border-2 border-white object-cover object-center shadow-sm"
    />
  ))}
</div>

      <div className="project-stats">
        <span><RiFileListLine/> {project.tasks} tasks</span>
        <span><VscGraph/>  {project.activities} activities</span>
      </div>
    </div>
  );
const renderProjectCard = (project) => (
    <div key={project.id} className="project-card">
      {renderProjectCardHeader(project)}
      {renderProjectDetails(project)}
      {renderProjectProgress(project)}
      {renderProjectFooter(project)}
    </div>
  );

  return (
    <div className="project-overview">
      {renderProjectHeader()}
      <div className="project-cards-container">
        {allProjects.map(renderProjectCard)}
      </div>

      {/* Task Details Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="task-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="task-details-header">
              <h2>Task Details</h2>
              <button className="close-btn" onClick={closeEditModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="task-details-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="editTitle">Task Title</label>
                  <input
                    type="text"
                    id="editTitle"
                    name="title"
                    value={editTask.title}
                    onChange={handleEditInputChange}
                    placeholder="Enter task title"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="editDescription">Description</label>
                  <textarea
                    id="editDescription"
                    name="description"
                    value={editTask.description}
                    onChange={handleEditInputChange}
                    placeholder="Enter task description"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="editDueDate">Due Date</label>
                  <input
                    type="date"
                    id="editDueDate"
                    name="dueDate"
                    value={editTask.dueDate}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="form-group half">
                  <label htmlFor="editPriority">Priority</label>
                  <select
                    id="editPriority"
                    name="priority"
                    value={editTask.priority}
                    onChange={handleEditInputChange}
                    className="priority-select"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Status</label>
                  <select className="status-select">
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Subtasks</label>
                  <div className="subtasks-container">
                    {editTask.subtasks.map((subtask) => (
                      <div key={subtask.id} className="subtask-item">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => handleSubtaskToggle(subtask.id)}
                          className="subtask-checkbox"
                        />
                        <input
                          type="text"
                          value={subtask.text}
                          onChange={(e) => updateSubtaskText(subtask.id, e.target.value)}
                          placeholder="Subtask description"
                          className="subtask-input"
                        />
                      </div>
                    ))}
                    <button type="button" className="add-subtask-btn" onClick={addSubtask}>
                      + Add Subtask
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Assignees</label>
                  <div className="assignees-container">
                    <div className="assignee-item">
                      <div className="assignee-avatar">SJ</div>
                      <span>Sarah Johnson</span>
                    </div>
                    <div className="assignee-item">
                      <div className="assignee-avatar">DK</div>
                      <span>David Kim</span>
                    </div>
                    <button type="button" className="add-assignee-btn">+ Add</button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Comments</label>
                  <div className="comments-section">
                    <div className="comment-item">
                      <div className="comment-avatar">SJ</div>
                      <div className="comment-content">
                        <div className="comment-author">Sarah Johnson</div>
                        <div className="comment-text">Great progress on this project! The design looks amazing.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="task-details-actions">
                <button type="button" className="close-task-btn" onClick={closeEditModal}>
                  Close
                </button>
                <button type="button" className="open-full-task-btn">
                  Open Full Task
                </button>
                <button type="submit" className="save-changes-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Project