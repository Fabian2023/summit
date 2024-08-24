import { useState } from 'react';
import inicio from "../images/1.jpg";
import siguiente from "../images/SIGUIENTE.png";
import vista2 from "../images/2.jpg";
import pregunta1 from "../images/3.jpg";
import pregunta2 from "../images/4.jpg";
import pregunta3 from "../images/5.jpg";

function InicioYPreguntas() {
  const [inputValue, setInputValue] = useState('');
  const [showQuestions, setShowQuestions] = useState(false); // Estado para controlar la vista
  const [currentImage, setCurrentImage] = useState(vista2); // Imagen inicial de preguntas

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (inputValue.trim()) {
      setShowQuestions(true); // Muestra las preguntas al hacer clic en "Siguiente"
    } else {
      alert('Escribe tu nombre');
    }
  };

  const handleQuestionClick = (image) => {
    setCurrentImage(image); // Cambia la imagen según la pregunta seleccionada
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      {!showQuestions ? (
        // Vista inicial para ingresar el nombre
        <>
          <img src={inicio} alt="Inicio" className="max-w-full h-auto" />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="absolute h-36 z-10 bottom-60 text-6xl bg-transparent w-[75%] border-0 shadow-none outline-none focus:outline-none text-[#00427F] text-center"
            placeholder="Tu nombre..."
          />
          <img
            src={siguiente}
            alt="Siguiente"
            className="absolute left-[20%] h-36 z-10 bottom-16 cursor-pointer"
            onClick={handleClick}
          />
        </>
      ) : (
        // Vista de preguntas
        <>
          <img src={currentImage} alt="Pregunta" className="max-w-full h-auto" />
          <div
            className="absolute z-10 top-[69%] left-1/2 transform -translate-x-1/2 w-[80%] h-[6%] cursor-pointer"
            onClick={() => handleQuestionClick(pregunta1)}
          />
          <div
            className="absolute z-10 top-[78%] left-1/2 transform -translate-x-1/2 w-[80%] h-[6%] cursor-pointer"
            onClick={() => handleQuestionClick(pregunta2)}
          />
          <div
            className="absolute z-10 top-[87%] left-1/2 transform -translate-x-1/2 w-[80%] h-[6%] cursor-pointer"
            onClick={() => handleQuestionClick(pregunta3)}
          />
        </>
      )}
    </div>
  );
}

export default InicioYPreguntas;
