
import { useRoutes, BrowserRouter } from "react-router-dom";
import Inicio from "./Components/Inicio";
import BeginCce from "./Components/BeginCCE";
import Agradecimiento from "./Components/Agradecimiento";
import QrNegocios from "./Components/QrNegocios";
import QrCamara from "./Components/QrCamara";
import Agenda from "./Components/Agenda";




import "./App.css";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/register", element: <BeginCce /> },
    { path: "/", element: <Inicio /> },
    { path: "/thnks", element: <Agradecimiento /> },
    { path: "/qr", element: <QrNegocios /> },
    { path: "/qrcam", element: <QrCamara /> },
    { path: "/agend", element: <Agenda /> },
  
   
  
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