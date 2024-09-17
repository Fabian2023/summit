import { useEffect, useState } from "react";
import vista4 from "../images/page-0004.jpg";
import vista2 from "../images/page-0005.jpg";
import pregunta1 from "../images/3.jpg";
import pregunta2 from "../images/4.jpg";
import pregunta3 from "../images/5.jpg";
import { connect, destroy, sendInput } from "../../lib/utils";
import { register } from "../../lib/firebase";

// eslint-disable-next-line no-unused-vars
const RTCPeerConnection = (
  window.RTCPeerConnection ||
  window.webkitRTCPeerConnection ||
  window.mozRTCPeerConnection
).bind(window);

function InicioYPreguntas() {
  const [inputValue, setInputValue] = useState("");
  const [showQuestions, setShowQuestions] = useState(false); // Estado para controlar la vista
  const [currentImage, setCurrentImage] = useState(vista2); // Imagen inicial de preguntas

  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isStream, setIsStream] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (inputValue.trim()) {
      sendInput(inputValue);
      register(inputValue, 1);

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setShowQuestions(true); // Muestra las preguntas al hacer clic en "Siguiente"
        setInputValue("");
      }, 2500);
    } else {
      alert("Escribe tu nombre");
    }
  };

  const handleQuestionClick = async (image) => {
    if (isSelected) return;
    setIsSelected(true);
    setCurrentImage(image);
    if (isStream) await destroy();
    setIsStream(false);
  };

  function endExp() {
    setCurrentImage(vista2);
    setShowQuestions(false);
    setIsSelected(false);
  }

  useEffect(() => {
    const performConnection = async () => {
      await connect(); // Espera a que connect termine
      setIsStream(true);
    };
    performConnection();
  }, [showQuestions]);

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div>
        <video
          id="talk-video"
          autoPlay
          playsInline
          className="absolute w-[650px] h-[650px] top-[12%] left-[18%] z-50 rounded-full"
        ></video>
      </div>
      {currentImage === pregunta1 && (
        <video
          className="absolute w-[650px] h-[650px] top-[28%] left-[24%] z-50 rounded-full"
          autoPlay
          onEnded={endExp}
        >
          <source src="/1_male.mp4" />
        </video>
      )}
      {currentImage === pregunta2 && (
        <video
          className="absolute w-[650px] h-[650px] top-[28%] left-[24%] z-50 rounded-full"
          onEnded={endExp}
          autoPlay
        >
          <source src="/2_male.mp4" />
        </video>
      )}
      {currentImage === pregunta3 && (
        <video
          className="absolute w-[650px] h-[650px] top-[28%] left-[24%] z-50 rounded-full"
          autoPlay
          onEnded={endExp}
        >
          <source src="/3_male.mp4" />
        </video>
      )}
      {!showQuestions ? (
        // Vista inicial para ingresar el nombre
        <>
             <img src={vista4} alt="Inicio" className="max-w-full h-auto" />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="absolute text-center top-[35%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-16 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
          placeholder="Escribe tu nombre"
        />
        <input
          type="text"
          className="absolute text-center top-[50%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-12 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
          placeholder="Escribe tu empresa"
        />
        <input
          type="email"
          className="absolute text-center top-[63.5%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-12 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
          placeholder="Escribe tu correo"
        />
        <input
          type="tel"
          className="absolute text-center top-[78.5%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-12 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
          placeholder="Escribe tu teléfono"
        />
        <div className="absolute top-[86.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[56%] h-32 flex items-center justify-center">
            <button
              className="bg-[#FF204C] text-white py-2 px-4 rounded-3xl w-[58%] h-[74%] font-bold text-6xl"
              onClick={handleClick}
            >
              Continuar
            </button>
          </div>

        {isLoading && (
          <div className="absolute z-50 h-screen w-screen flex justify-center items-center bg-black/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="500"
              className="animate-spin w-[150px] h-[150px]"
            >
              <path
                className="fill-white"
                d="M480-80q-84 0-157-31t-127-85q-54-54-85-127T80-480q0-84 31-157t85-127q54-54 127-85t157-31q12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80Z"
              />
            </svg>
          </div>
        )}
      </>
    ) : (
      // Vista de preguntas
      <>
        {/* <img
          src="/circulo.png"
          alt="circle"
          className="absolute w-[650px] h-[655px] top-[27.8%] left-[24%] z-50"
        /> */}
        <img
          src="/alonso.jpg"
          alt=""
          className="absolute w-[650px] h-[650px] top-[12%] left-[18%] z-40 rounded-full"
        />
        <img
          src={currentImage}
          alt="Pregunta"
          className="max-w-full h-auto"
        />
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