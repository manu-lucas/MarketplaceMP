import React from "react";
import { Link } from "react-router-dom";

const Introduccion = () => {
  return (
    <div>
      <h2>Introducción</h2>
      <div style={{ display: "flex", gap: "80px" }}>
        <Link to="/autorizacion">Autorizacion Vendedor</Link>
        <Link to="/compra">Formulario de Compra</Link>
      </div>
    </div>
  );
};

export default Introduccion;
