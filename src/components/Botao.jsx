import React from 'react';
// import '../styles.css'



function Botao({texto}){
  return (
    <button className='botao'>
      {texto}
    </button>
  );
}

export default Botao;