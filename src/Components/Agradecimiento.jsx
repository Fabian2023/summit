import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import vista10 from '../images/page-0012.jpg';
import vista11 from '../images/page-0013.jpg';
import vista12 from '../images/page-0014.jpg';
import vista13 from '../images/page-0015.jpg';

const Agradecimiento = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(vista10);

  useEffect(() => {
    let timeout1, timeout2, timeout3, timeout4;

    if (currentImage === vista10) {
      timeout1 = setTimeout(() => {
        setCurrentImage(vista11);
      }, 3000);
    } else if (currentImage === vista11) {
      timeout2 = setTimeout(() => {
        setCurrentImage(vista12);
      }, 3000);
    } else if (currentImage === vista12) {
      timeout3 = setTimeout(() => {
        setCurrentImage(vista13);
      }, 3000);
    } else if (currentImage === vista13) {
      timeout4 = setTimeout(() => {
        navigate("/"); // Redirige a la página principal
      }, 3000);
    }

    // Limpiar los timeouts cuando se desmonta el componente o cambia currentImage
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, [currentImage, navigate]);

  return (
    <div className="relative">
      

      {currentImage === vista10 && (
        <img
          src={vista10}
          className="absolute top-[0%] left-[0%] z-50 w-[1080px] h-[1920px]"
          alt="Vista 10"
        />
      )}

      {currentImage === vista11 && (
        <img
          src={vista11}
          className="absolute top-[0%] left-[0%] z-50 w-[1080px] h-[1920px]"
          alt="Vista 11"
        />
      )}

      {currentImage === vista12 && (
        <img
          src={vista12}
          className="absolute top-[0%] left-[0%] z-50 w-[1080px] h-[1920px]"
          alt="Vista 12"
        />
      )}

      {currentImage === vista13 && (
        <img
          src={vista13}
          className="absolute top-[0%] left-[0%] z-50 w-[1080px] h-[1920px]"
          alt="Vista 13"
        />
      )}
    </div>
  );
};

export default Agradecimiento;
