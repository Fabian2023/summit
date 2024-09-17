
import { useRoutes, BrowserRouter } from "react-router-dom";
import Inicio from "./Components/Inicio";
import BeginCce from "./Components/BeginCCE";




import "./App.css";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/register", element: <BeginCce /> },
    { path: "/", element: <Inicio /> },
  
   
  
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