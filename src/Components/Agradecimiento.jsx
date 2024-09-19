import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import vista10 from '../images/page-0012.jpg';
import vista11 from '../images/page-0013.jpg';
import vista12 from '../images/page-0014.jpg';
import vista13 from '../images/page-0015.jpg';

const Agradecimiento = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(vista10);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  useEffect(() => {
    let timeout1, timeout2, timeout3, timeout4;

    if (currentImage === vista10) {
      timeout1 = setTimeout(() => {
        setCurrentImage(vista11);
        setLoading(true); // Volver a activar loading
      }, 3000);
    } else if (currentImage === vista11) {
      timeout2 = setTimeout(() => {
        setCurrentImage(vista12);
        setLoading(true);
      }, 3000);
    } else if (currentImage === vista12) {
      timeout3 = setTimeout(() => {
        setCurrentImage(vista13);
        setLoading(true);
      }, 3000);
    } else if (currentImage === vista13) {
      timeout4 = setTimeout(() => {
        navigate("/"); // Redirige a la página principal
        setTimeout(() => {
          window.location.reload(); // Recarga la página después de la redirección
        }, 100); // Recarga después de un breve retraso para asegurarse de que la navegación ocurra primero
      }, 3000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, [currentImage, navigate]);

  // Cuando la imagen ha cargado completamente
  const handleImageLoad = () => {
    setLoading(false); // Dejar de mostrar el fondo púrpura cuando la imagen cargue
  };

  return (
    <div className="relative w-full h-screen bg-[#4E0286] flex justify-center items-center"> 
      {/* Fondo púrpura fijo mientras las imágenes están cargando */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 transition-opacity duration-500 ease-in-out ${loading ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: '#4E0286' }} // Fondo púrpura
      ></div>

      {/* Imágenes */}
      <div className="absolute top-0 left-0 w-full h-full z-20">
        {currentImage === vista10 && (
          <img
            src={vista10}
            className="w-full h-full object-cover"
            alt="Vista 10"
            onLoad={handleImageLoad}
          />
        )}
        {currentImage === vista11 && (
          <img
            src={vista11}
            className="w-full h-full object-cover"
            alt="Vista 11"
            onLoad={handleImageLoad}
          />
        )}
        {currentImage === vista12 && (
          <img
            src={vista12}
            className="w-full h-full object-cover"
            alt="Vista 12"
            onLoad={handleImageLoad}
          />
        )}
        {currentImage === vista13 && (
          <img
            src={vista13}
            className="w-full h-full object-cover"
            alt="Vista 13"
            onLoad={handleImageLoad}
          />
        )}
      </div>
    </div>
  );
};

export default Agradecimiento;
