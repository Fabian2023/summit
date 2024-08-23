
import { useRoutes, BrowserRouter } from "react-router-dom";
import Inicio from "./Components/Inicio";
import Preguntas from "./Components/Preguntas";



import "./App.css";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/preguntas", element: <Preguntas /> },
   
  
  ]);
  return routes;
};

function App() {
  
  

  return (
    <BrowserRouter>
      <AppRoutes  />
    </BrowserRouter>
  );
}

export default App;