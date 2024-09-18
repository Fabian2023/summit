import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import inicio from "../Images/page-0001.jpg";
import vista2 from "../Images/page-0002.jpg";
import vista3 from "../Images/page-0003.jpg";

const Inicio = () => {
  const [imagenActual, setImagenActual] = useState(inicio);
  const [showButton, setShowButton] = useState(false); // Para controlar la visibilidad del botón

  const navigate = useNavigate(); 

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setImagenActual(vista2);
    }, 3000); // Cambia a vista2 después de 3000 ms (3 segundos)

    const timer2 = setTimeout(() => {
      setImagenActual(vista3);
      setShowButton(true); // Muestra el botón cuando la imagen actual es vista3
    }, 6000); // Cambia a vista3 después de 6000 ms (3 segundos después de vista2)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleClick = () => {
    navigate('/register'); // Redirige a la ruta /registrate
  };

  return (
    <div className="relative">
      
      <img src={imagenActual} alt="Descripción de la imagen" className="w-full h-auto" />

   
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
