import { useEffect, useState } from "react";
import qrnegocio from "../images/qr negocios.jpg";
import QR from "../images/qrcode_Ecommerce_summit.png";
import { useNavigate } from "react-router-dom";

const QrNegocios = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Usamos useEffect para activar la animación después de que el componente se haya montado
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500); // Retardo de 500ms antes de iniciar la animación
  }, []);

  const handlerclickThanks = () => {
    navigate("/thnks");
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      {/* Imagen del QR grande de fondo */}
      <img src={qrnegocio} alt="QR Negocios" className="max-w-full h-auto" />

      {/* Recuadro con borde blanco y fondo #4E0286 */}
      <div
        className="absolute top-[30%] left-[10%] w-[80%] h-[40%] bg-[#4E0286]  flex flex-col justify-center items-center"
        style={{ zIndex: 10 }}
      >
        {/* Título (h1) con animación de difuminado */}
        <h1
          className={`text-white text-9xl mb-44 font-semibold transition-opacity duration-1000 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Agenda tu cita
        </h1>

        {/* Imagen del QR dentro del recuadro */}
        <img src={QR} alt="QR Code" className="max-w-[70%] max-h-[70%]" />
      </div>

      {/* Botón Continuar con animación de difuminado */}
      <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[56%] h-32 flex items-center justify-center">
        <button
          className={`bg-[#FF204C] text-white py-2 px-4 rounded-3xl w-[58%] h-[74%] font-bold text-6xl transition-opacity duration-1000 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handlerclickThanks}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default QrNegocios;
