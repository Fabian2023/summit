import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import vista4 from "../images/page-0004.jpg";
import vista2 from "../images/page-0005.jpg";
import vista6 from "../images/page-0006.jpg";
import vista7 from "../images/page-0007.png";



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
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [showQuestions, setShowQuestions] = useState(false); 
  const [currentImage, setCurrentImage] = useState(vista2); 

  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isStream, setIsStream] = useState(false);

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideo2, setPlayVideo2] = useState(false);
  const [playVideo3, setPlayVideo3] = useState(false);

  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const handleDatabase = async () => {
    try {
      await register(inputValue, company, email, phone); // Usamos la función register para enviar los datos a Firebase
      console.log("Datos registrados correctamente en Firebase");
    } catch (error) {
      console.error("Error registrando los datos:", error);
    }
  };

  const handlerclickThanks = () => {
    navigate("/thnks");
    
  };

  const gotoagend= () => {
    
    navigate("/agend");
    
    
  };

  const goToQr = () => {
    navigate('/qr');
    
  };

  const goToQrcam = () => {
    navigate('/qrcam');
    
  };

  const handleClick = () => {
    if (inputValue.trim()) {
      sendInput(inputValue);
      register(inputValue, 1);
      handleDatabase();
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

  // function endExp() {
  //   setCurrentImage(vista2);
  //   setShowQuestions(false);
  //   setIsSelected(false);
  // }

  useEffect(() => {
    const performConnection = async () => {
      await connect(); // Espera a que connect termine
      setIsStream(true);
    };
    performConnection();
  }, [showQuestions]);

  useEffect(() => {
    // Detener la reproducción de otros videos cuando uno esté en reproducción
    if (playVideo) {
      setPlayVideo2(false);
      setPlayVideo3(false);
    } else if (playVideo2) {
      setPlayVideo(false);
      setPlayVideo3(false);
    } else if (playVideo3) {
      setPlayVideo(false);
      setPlayVideo2(false);
    }
  }, [playVideo, playVideo2, playVideo3]);

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
          className="absolute w-[650px] h-[650px] top-[12%] left-[18%] z-50 rounded-full"
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
            onChange={(e) => setInputValue(e.target.value)}
            className="absolute text-center top-[35%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-16 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
            placeholder="Escribe tu nombre"
          />
          <input
            type="text"
            className="absolute text-center top-[50%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-12 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
            placeholder="Escribe tu empresa"
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="email"
            className="absolute text-center top-[63.5%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-12 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
            placeholder="Escribe tu correo"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="absolute text-center top-[78.5%] z-50 text-5xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[54%] h-12 flex items-center justify-center text-black bg-transparent border-none outline-none focus:outline-none"
            placeholder="Escribe tu teléfono"
            onChange={(e) => setPhone(e.target.value)}
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
          <img
            src="/circulo.png"
            alt="circle"
            className="absolute w-[650px] h-[655px] top-[12%] left-[18%] z-50"
          />
          <img
            src="/salome.jpg"
            alt=""
            className="absolute w-[650px] h-[650px] top-[12%] left-[18%]  rounded-full"
          />
          <img
            src={currentImage}
            alt="Pregunta"
            className="max-w-full h-auto"
          />
          {currentImage === vista2 && (
            <>
              <div
                className="absolute top-[59%] left-[18%] z-30 w-[60%] h-[5%]"
                onClick={() => {
                  setPlayVideo(true); // Activa la reproducción del video
                }}
              />
              <div
                className="absolute top-[65%] left-[22%] z-20 w-[55%] h-[5%] "
                onClick={() => {
                  setPlayVideo2(true); // Acción para el nuevo div
                }}
              ></div>
              <div
                className="absolute top-[70%] left-[22%] z-20 w-[70%] h-[10%]"
                onClick={() => {
                setPlayVideo3(true); // Acción para el nuevo div
                }}
              ></div>
            </>
          )}

          {playVideo && (
            <video
              className="absolute w-[650px] h-[650px] top-[12%] left-[18%] z-50 rounded-full"
              autoPlay
              onEnded={() => {
                setPlayVideo(false); // Detiene la reproducción
                gotoagend()
              }}
              style={{ objectFit: "cover" }}
            >
              <source src="/19sep.mp4" type="video/mp4" />
            </video>
          )}
          {playVideo2 && (
            <video
              className="absolute w-[650px] h-[650px] top-[12%] left-[18%] z-50 rounded-full"
              autoPlay
              onEnded={() => {
                setPlayVideo2(false); // Detiene la reproducción
                goToQr(); 
              }}
              style={{ objectFit: "cover" }}
            >
              <source src="/negocios.mp4" type="video/mp4" />
            </video>
          )}
          {playVideo3 && (
            <video
              className="absolute w-[650px] h-[650px] top-[12%] left-[18%] z-50 rounded-full"
              autoPlay
              onEnded={() => {
                setPlayVideo3(false); // Detiene la reproducción
                goToQrcam(); 
              }}
              style={{ objectFit: "cover" }}
            >
              <source src="/que es cce.mp4" type="video/mp4" />
            </video>
          )}
          {currentImage === vista6 && (
            <img
              src={vista6} // Reemplaza con la ruta de tu imagen
              className="absolute top-[0%] left-[0%] z-50 w-[1080px] h-[1920px]" // Asegúrate de que el z-index sea mayor para superponerla
              alt="Imagen por encima"
              onClick={() => setCurrentImage(vista7)}
            />
          )}
          {currentImage === vista7 && (
            <img
              src={vista7} // Reemplaza con la ruta de tu imagen
              className="absolute top-[0%] left-[0%] z-50 w-[1080px] h-[1920px]" // Asegúrate de que el z-index sea mayor para superponerla
              alt="Imagen por encima"
              onClick={handlerclickThanks}
            />
          )}

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
