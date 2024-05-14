import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const CompraVendedor = () => {
  const valor = localStorage.getItem("public_key");
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago(valor);
  const enviarData = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:3000/create_preference"; // Replace with your actual API endpoint

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set headers for JSON data
        body: JSON.stringify({ title: "prueba", quantity: 1, price: 10 }), // Replace with your actual data
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log("respuesta", responseData.id);
      setPreferenceId(responseData.id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>MarketPlace Tus Ventas</h2>

      <h5>Soy un Formulario</h5>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={enviarData}
      >
        Enviar
      </button>

      {preferenceId && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </div>
  );
};

export default CompraVendedor;
