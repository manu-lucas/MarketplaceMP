import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Introduccion from "./pages/Introduccion";
import AutorizacionVendedor from "./pages/AutorizacionVendedor";
import CompraVendedor from "./pages/CompraVendedor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Introduccion />,
  },
  {
    path: "/autorizacion",
    element: <AutorizacionVendedor />,
  },

  {
    path: "/compra",
    element: <CompraVendedor />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
