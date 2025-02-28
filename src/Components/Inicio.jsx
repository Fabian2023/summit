import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import inicio from "../images/page-0001.jpg";
import vista2 from "../images/page-0002.jpg";
import vista3 from "../images/page-0003.jpg";

const Inicio = () => {
  const [imagenActual, setImagenActual] = useState(inicio);
  const [showButton, setShowButton] = useState(false); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setImagenActual(vista2);
    }, 3000); 

    const timer2 = setTimeout(() => {
      setImagenActual(vista3);
      setShowButton(true); 
    }, 6000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleClick = () => {
    navigate('/register');
    window.location.reload(); // Fuerza la recarga de la página
  };

  return (
    <div className="relative w-screen h-screen" style={{ backgroundColor: '#4E0286' }}>
      {/* Imagen que cambia */}
      <img src={imagenActual} alt="Descripción de la imagen" className="w-full h-auto" />

      {/* Botón que aparece después de un tiempo */}
      <button
        className={`absolute top-[70%] left-1/2 transform -translate-x-1/2 bg-[#FF204C] text-white h-24 w-[45%] py-2 px-4 rounded-3xl font-bold text-6xl transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClick}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Inicio;
