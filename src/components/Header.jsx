import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/header.css'

function Header() {

  const navigate = useNavigate();

  function toHome(){
    navigate('/home'); 
  }
  function toTurmas(){
    navigate('/turma'); 
  }
  function toAtiv(){
    navigate('/atividade'); 
  }

  return (
    <div className="header">
        <div className="logo">
          <img src="image/logo.png" alt="logo" id='logo_img'/>
          <div id="logo">EduPro</div>
        </div>
        <div className="pages">
          <button id='pages' onClick={toHome}>Home</button>
          <button id='pages' onClick={toTurmas}>Turmas</button>
          <button id='pages' onClick={toAtiv}>Atividades</button>
        </div>
        <div className="conta">
          <img src="image/icon.png" alt="account" />
        </div>
    </div>
  );
}

export default Header;