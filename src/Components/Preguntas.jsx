// import { useState } from 'react';
// import vista2 from "../images/2.jpg";
// import pregunta1 from "../images/3.jpg";
// import pregunta2 from "../images/4.jpg";
// import pregunta3 from "../images/5.jpg";

// function Preguntas() {
//   const [currentImage, setCurrentImage] = useState(vista2); // Inicialmente muestra la imagen vista2

  

//   const handleClick = (image) => {
//     setCurrentImage(image);
//   };

//   return (
//     <div className="relative flex justify-center items-center h-screen">
//       <img src={currentImage} alt="Pregunta" className="max-w-full h-auto" />
//       <div
//         className="absolute  z-10 top-[69%] left-1/2 transform -translate-x-1/2 w-[80%] h-[6%] cursor-pointer"
//         onClick={() => handleClick(pregunta1)}
//       />
//       <div
//         className="absolute  z-10 top-[78%] left-1/2 transform -translate-x-1/2 w-[80%] h-[6%] cursor-pointer"
//         onClick={() => handleClick(pregunta2)}
//       />
//       <div
//         className="absolute  z-10 top-[87%] left-1/2 transform -translate-x-1/2 w-[80%] h-[6%] cursor-pointer"
//         onClick={() => handleClick(pregunta3)}
//       />
//     </div>
//   );
// }

// export default Preguntas;
