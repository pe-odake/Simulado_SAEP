import React from 'react';
import '../css/header.css'
function Header() {
  return (
    <div className="header">
        <div className="logo">
          <img src="image/logo.png" alt="logo" id='logo_img'/>
          <div id="logo">EduPro</div>
        </div>
        <div className="pages">
          <div id="pages">Home</div>
          <div id="pages">Turmas</div>
        </div>
        <div className="conta">
          <img src="image/icon.png" alt="account" />
        </div>
    </div>
  );
}

export default Header;