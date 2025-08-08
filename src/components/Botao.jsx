import React from 'react';
// import '../styles.css'

// , onClick   onClick={onClick}
function Botao({ texto}){
  return (
    <button className='botao'>
      {texto}
    </button>
  );
}

export default Botao;