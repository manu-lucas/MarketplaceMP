import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


const app = express();
var glogalAcceso;
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Solicitud GET recibidaaaa" });
});

app.get("/autorizacionMarketPlace", async (req, res) => {

  const id = uuidv4();
  const clientId = 7689245797766293;
  const redirect = "https://usd-limits-kevin-rehabilitation.trycloudflare.com/autorizacion";
  const urlauthorizacion = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${id}&redirect_uri=${redirect}`;

  res.status(200).json({ url: urlauthorizacion });
});

app.post("/autorizacionMarketPlace", async (req, res) => {
  try {
    const { code } = req.body;
    console.log("codigoback", code);
    const url = "https://api.mercadopago.com/oauth/token";

    if (!code) {
      return res
        .status(400)
        .json({ message: "El parámetro 'code' es necesario" });
    }

    const data = {
      client_id: "7689245797766293",
      client_secret: "whE6KZhbuXr4fGWchsbz24PYfzgrKcIl",
      code: `${code}`,
      grant_type: "authorization_code",
      redirect_uri: "https://usd-limits-kevin-rehabilitation.trycloudflare.com/autorizacion",
      refresh_token: `${code}`,
    };

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    const { access_token, public_key } = response.data;


    glogalAcceso = access_token;

    res.status(200).json({public_key:public_key});
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
});

app.post("/create_preference", async (req, res) => {
  glogalAcceso 

  const client = new MercadoPagoConfig({
    accessToken:
      "APP_USR-7689245797766293-051409-bcbc767122be40cb774d1abd26b02e36-1796796862",
  });

  const preference = new Preference(client);

  preference
    .create({
      body: {
        items: [
          {
            id: "item-ID-1",
            title: req.body.title,
            quantity: req.body.quantity,
            unit_price: req.body.price,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://web-empresa-kappa.vercel.app/",
          failure: "https://web-empresa-kappa.vercel.app/",
          pending: "https://web-empresa-kappa.vercel.app/",
        },
        marketplace_fee: 1,
      },
    })
    .then((result) => {
      const respuesta = result;
      console.log(respuesta.id);

      res.status(200).json({ id: respuesta.id });
    })
    .catch(console.log);
});

app.post("/webhook", async (req, res) => {


  try {
    const client = new MercadoPagoConfig({
      accessToken: "APP_USR-7689245797766293-051409-bcbc767122be40cb774d1abd26b02e36-1796796862",
    });


    const payment = await new Payment(client).get({id:req.body.data.id});
    console.log(payment);

    res.status(200).send("Payment processed successfully");
  } catch (error) {
    console.error("Error processing payment: ", error);
    res.status(500).send("Failed to process payment");
  }
//   comprobar un pago en el marketplace
//   transaction_amount: 10,
//  net_received_amount: 8.59,
//  total_paid_amount: 10
//  description: 'prueba',
//  fee_details: [
//   { amount: 0.41, fee_payer: 'collector', type: 'mercadopago_fee' },
//   { amount: 1, fee_payer: 'collector', type: 'application_fee' }
})


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
