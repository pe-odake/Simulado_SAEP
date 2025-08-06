import React from 'react';
import '../styles.css'

function Botao({ texto, onClick }) {
  return (
    <button onClick={onClick} className='botao'>
      {texto}
    </button>
  );
}

export default Botao;