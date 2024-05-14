import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const AutorizacionVendedor = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [publicKey, setPublicKey] = useState(null);
  console.log(code);

  useEffect(() => {
    if (code) {
      const postAuthorizationCode = async () => {
        try {
          const url = "http://localhost:3000/autorizacionMarketPlace";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }), // Enviar el código como JSON
          });

          if (!response.ok) {
            throw new Error(
              `La solicitud falló con el estado ${response.status}`
            );
          }

          const responseData = await response.json();
          console.log(responseData);
          const { public_key } = responseData;
          localStorage.setItem("public_key", public_key);

          setPublicKey(public_key);
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      };

      postAuthorizationCode();
    }
  }, [code]);

  async function generarAutorizacion(event) {
    event.preventDefault();
    try {
      const url = "http://localhost:3000/autorizacionMarketPlace";

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData.url);
      window.location.href = responseData.url;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <h2>Autorizacion Vendedor </h2>

      {publicKey === null && (
        <button onClick={generarAutorizacion}>Generar la autorizacion </button>
      )}
      {publicKey !== null && <Link to="/"> Volver al inicio</Link>}
    </div>
  );
};

export default AutorizacionVendedor;
