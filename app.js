import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
//import nodemailer from "nodemailer";

import contactsRouter from "./routes/api/contacts-router.js"; 
import authRouter from "./routes/api/auth-router.js";

dotenv.config();
const app = express();
/*const { UKR_NET_EMAIL_FROM, UKR_NET_EMAIL_PASSWORD } = process.env;
console.log(UKR_NET_EMAIL_FROM)
console.log(UKR_NET_EMAIL_PASSWORD)

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {

    user: UKR_NET_EMAIL_FROM,
    pass: UKR_NET_EMAIL_PASSWORD,
  }
};


const transport = nodemailer.createTransport(nodemailerConfig);
const email = {
  from: UKR_NET_EMAIL_FROM,
  to: "nayaj96193@bookspre.com",
  subject: "Test email",
  html: "<strong>Test email</strong>",

}
transport.sendMail(email)
  .then(() => console.log("Email send succsess"))
  .catch(error => console.log(error.message)) */

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.use('/api/contacts', contactsRouter)
app.use("/api/users", authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
})

export default app;
