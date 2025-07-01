import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo-wrapper">
        <div className="logo-circle">
          <img src="/skillmate-logo.png" alt="Skillmate Logo" />
        </div>
       <span className="logo-text">
  <span className="skill">Skill</span><span className="mate">mate</span>
</span>


      </div>
    </div>
  );
}
