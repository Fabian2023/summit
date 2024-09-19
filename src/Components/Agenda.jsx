import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vista6 from '../images/page-0006.jpg';
import vista7 from '../images/page-0007.png';

const Agenda = () => {
  const [currentView, setCurrentView] = useState('vista6');
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (currentView === 'vista6') {
      setCurrentView('vista7');
    } else if (currentView === 'vista7') {
      handlerclickThanks();
    }
  };

  const handlerclickThanks = () => {
    navigate('/thnks');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: '#4E0286' }}>
      {/* Fondo púrpura fijo detrás de las imágenes */}
      
      {currentView === 'vista6' && (
        <img
          src={vista6}
          alt="Vista 6"
          className="absolute inset-0 object-cover w-full h-full cursor-pointer"
          onClick={handleImageClick}
        />
      )}
      {currentView === 'vista7' && (
        <img
          src={vista7}
          alt="Vista 7"
          className="absolute inset-0  h-[1920px] w-[1080px]  cursor-pointer  "
          onClick={handleImageClick}
        />
      )}
    </div>
  );
};

export default Agenda;
