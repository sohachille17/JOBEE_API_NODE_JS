const nodemailler = require("nodemailer");


const sendEmail = async options => {
    host: process.env.SMTP_HOST
    port: process.env.SMTP_PORT
    auth:{
        user: process.env.SMTP_EMAIL
        pass: process.env.SMPT_PASSWORD
    }

}