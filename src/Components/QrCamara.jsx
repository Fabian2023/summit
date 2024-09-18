import React from "react";
import vista16 from "../images/page-0016.jpg";
import { useNavigate } from "react-router-dom";

const QrCamara = () => {
    const navigate = useNavigate();

    const handlerclickThanks = () => {
        navigate("/thnks");
      };


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={vista16}
        alt="Vista QR Cámara"
        className="absolute inset-0 object-cover w-full h-full"
      />

      <div className="absolute top-[86.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[56%] h-32 flex items-center justify-center">
        <button
          className="bg-[#FF204C] text-white py-2 px-4 rounded-3xl w-[58%] h-[74%] font-bold text-6xl"
          onClick={handlerclickThanks}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default QrCamara;
