import React, { useState } from 'react'
import './Team.css'

/**
 * Team Component - ye team members aur tomorrow ke notes ko show karta hai
 * Isme team ki performance aur kal ke plans dono show hote hain
 */
const Team = ({allEmployee}) => {
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Team members ka data - ye table mein show hota hai
  // Isse easily modify kar sakte hain - add kar sakte hain, remove kar sakte hain, change kar sakte hain
  const teamMembersData = [
    {
      id: 'alex',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      role: 'UI/UX Designer',
      avatar: 'https://arawebtechnologies.com/assets/images/u1.png',
      performance: '+12% this week',
      performanceClass: 'positive'
    },
    {
      id: 'jessica',
      name: 'Jessica Chen',
      email: 'jessica.chen@example.com',
      role: 'Frontend Developer',
      avatar: 'https://arawebtechnologies.com/assets/images/u2.png',
      performance: '+8% this week',
      performanceClass: 'positive'
    },
    {
      id: 'ryan',
      name: 'Ryan Park',
      email: 'ryan.park@example.com',
      role: 'Product Manager',
      avatar: 'https://arawebtechnologies.com/assets/images/u3.png',
      performance: '+15% this week',
      performanceClass: 'positive'
    },
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Backend Developer',
      avatar: 'https://arawebtechnologies.com/assets/images/u4.png',
      performance: '-3% this week',
      performanceClass: 'negative'
    }
  ];

  // Tomorrow ke notes ka data - ye right side mein show hota hai
  // Isse easily modify kar sakte hain - add kar sakte hain, remove kar sakte hain
  const tomorrowNotes = [
    'Team meeting at 10:00 AM with design department',
    'Review design system updates for Figma components',
    'Finalize project timeline for Keep React development',
    'Prepare presentation for client meeting at 2:00 PM',
    'Follow up with marketing team on campaign assets'
  ];

  /**
   * Dropdown menu ko open/close karne ke liye
   * Ye function team member ke actions ke liye use hota hai
   * @param {string} memberId - Kis team member ka dropdown toggle karna hai
   */
  const toggleDropdown = (memberId) => {
    setActiveDropdown(activeDropdown === memberId ? null : memberId)
  }

  /**
   * Action button ko click karne ke liye
   * Ye function edit, save, delete actions ko handle karta hai
   * @param {string} action - Kya action karna hai (edit, save, delete)
   * @param {string} memberId - Kis team member ke liye action karna hai
   */
  const handleAction = (action, memberId) => {
    console.log(`${action} action for member ${memberId}`)
    setActiveDropdown(null)
  }

  /**
   * Team members section ka header render karne ke liye
   * Isme title aur view all button show hota hai
   */
  const renderTeamMembersHeader = () => (
    <div className="section-header">
      <h3>Team Members</h3>
      <button className="view-all-btn">
        <i className="ri-group-line"></i>
        View All
      </button>
    </div>
  );

  /**
   * Table ka header render karne ke liye
   * Isme columns ke names show hote hain - Name, Role, Performance, Actions
   */
  const renderTableHeader = () => (
    <div className="table-header">
      <span>Name</span>
      <span>Role</span>
      <span>Performance</span>
      <span>Actions</span>
    </div>
  );

  /**
   * Team member ki information render karne ke liye
   * Isme avatar, naam, aur email show hota hai
   * @param {Object} member - Team member ka data object
   */
  const renderMemberInfo = (member) => (
    <div className="member-info">
      <img src={`http://localhost:5000/api/${member?.profileImage}`} alt={member?.firstName} className="member-avatar" />
      <div className="member-details">
        <span className="member-name">{member?.firstName}</span>
        <span className="member-email">{member.email}</span>
      </div>
    </div>
  );

  /**
   * Action dropdown ko render karne ke liye
   * Isme edit, save, delete buttons show hote hain
   * @param {Object} member - Team member ka data object
   */
  const renderActionDropdown = (member) => (
    <div className="action-dropdown">
      <button className="action-btn" onClick={() => toggleDropdown(member?._id)}>
        <i className="ri-more-2-line"></i>
      </button>
      {activeDropdown === member?._id && (
        <div className="dropdown-menu">
          <button onClick={() => handleAction('edit', member?._id)}>
            <i className="ri-edit-line"></i>
            Edit
          </button>
          <button onClick={() => handleAction('save', member?._id)}>
            <i className="ri-save-line"></i>
            Save
          </button>
          <button onClick={() => handleAction('delete', member?._id)}>
            <i className="ri-delete-bin-line"></i>
            Delete
          </button>
        </div>
      )}
    </div>
  );

  /**
   * Individual team member row ko render karne ke liye
   * Ye function complete team member row ko banata hai
   * @param {Object} member - Team member ka data object
   */
  const renderTeamMember = (member) => (
    <div key={member?._id} className="team-member">
      {renderMemberInfo(member)}
      <span className="member-role">{member?.role?.name}</span>
      {/* <span className={`performance-badge ${member.performanceClass}`}>
        {member.performance}
      </span> */}
      {renderActionDropdown(member)}
    </div>
  );

  /**
   * Tomorrow notes section ka header render karne ke liye
   * Isme title aur private button show hota hai
   */
  const renderTomorrowNotesHeader = () => (
    <div className="section-header">
      <h3>Tomorrow Note</h3>
      <button className="private-btn">
        <i className="ri-lock-line"></i>
        Private
      </button>
    </div>
  );

  /**
   * Individual note item ko render karne ke liye
   * Isme bullet point aur note ka text show hota hai
   * @param {string} note - Note ka text
   * @param {number} index - Note ka index number
   */
  const renderNoteItem = (note, index) => (
    <div key={index} className="note-item">
      <span className="note-bullet">•</span>
      <span className="note-text">{note}</span>
    </div>
  );

  /**
   * Notes actions section ko render karne ke liye
   * Isme add note aur edit notes buttons show hote hain
   */
  const renderNotesActions = () => (
    <div className="notes-actions">
      <button className="add-note-btn">
        <i className="ri-add-line"></i>
        Add Note
      </button>
      <button className="edit-notes-btn">Edit Notes</button>
    </div>
  );

  return (
    <div className="team-container">
      {/* Team Members Section - left side mein */}
      <div className="team-members-section">
        {renderTeamMembersHeader()}
        <p className="section-subtitle">Performance overview of team members</p>
        
        <div className="team-table">
          {renderTableHeader()}
          
          {/* Sab team members ko render kar rahe hain */}
          {allEmployee.map(renderTeamMember)}
        </div>
      </div>

      {/* Tomorrow Notes Section - right side mein */}
      <div className="tomorrow-notes-section">
        {renderTomorrowNotesHeader()}
        <p className="section-subtitle">Your personal notes for tomorrow</p>
        
        <div className="notes-list">
          {/* Sab tomorrow notes ko render kar rahe hain */}
          {tomorrowNotes.map(renderNoteItem)}
        </div>

        {renderNotesActions()}
      </div>
    </div>
  )
}

export default Team