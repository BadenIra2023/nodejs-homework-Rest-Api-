import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { UKR_NET_EMAIL_FROM, UKR_NET_EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {

    user: UKR_NET_EMAIL_FROM,
    pass: UKR_NET_EMAIL_PASSWORD,
  }
};

//from: UKR_NET_EMAIL_FROM,
const transport = nodemailer.createTransport(nodemailerConfig);
/*const data = {
  
  to: "nayaj96193@bookspre.com",
  subject: "Test email",
  html: "<strong>Test email</strong>",

} */


const sendEmail = data => {
    const email = { ...data, from: UKR_NET_EMAIL_FROM };
    return transport.sendMail(email);
}

export default sendEmail;
