Opcional :  se usan túneles  de red, para desarrollo de producción 

Probar el codigo 

 Requisitos . 
 3 Cuentas de prueba :  .  Marketplace - Vendedor - Comprador  
 Direccion de Re-direccion . 

 . Pasos . 
 - Configurar cuenta Marketplace . 
 - Autorizacion - Vendedor da permisos al Marketplace . Se le devuelve un codigo a la redireccion . Se envia el codigo al Servidor . El servidor procesa la peticion y devuelve el Client-Key y el Acces Token.  Al Cliente le pasamos el Client Key  y El servidor guarda el Access Token en Backend . Guardar en Base de datos . 

 - Comprador :
   El comprador procesas sus datos . Se procesa el pago y se comparten las comisiones.   

Comando para correr Front : npm run dev 
Comando para correr Backend : npm start  

