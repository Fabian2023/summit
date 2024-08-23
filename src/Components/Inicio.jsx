// Components/Inicio.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inicio from "../images/1.jpg";

function Inicio() {
  const [inputValue, setInputValue] = useState('');
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (inputValue.trim()) {
      navigate('/preguntas');
    }
    setClicked(true);
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <img src={inicio} alt="Inicio" className="max-w-full h-auto" />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onClick={handleClick}
        className="absolute h-36 z-10 bottom-60 text-6xl bg-transparent w-[75%] border-0 shadow-none outline-none focus:outline-none text-[#00427F] text-center"
        placeholder="Tu nombre..."
      />
    </div>
  );
}

export default Inicio;
