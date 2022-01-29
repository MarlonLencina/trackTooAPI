
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-handlebars'
import path from 'path'
import {IEmailProvider, sendEmailProps} from '../IEmailProvider'
import mg from "nodemailer-mailgun-transport"
import fs from 'fs'
import Handlebars from 'handlebars'
import SMTPTransport from 'nodemailer/lib/smtp-transport'


export class MailgunProvider implements IEmailProvider {

    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor(){

        const mailgunAuth = {
            auth: {
              api_key: process.env.MAILGUN_API_KEY,
              domain: process.env.MAILGUN_DOMAIN
            }
          }
          
        this.transporter = nodemailer.createTransport(mg(mailgunAuth));
        
    }

    public async sendEmail({email, name, link}: sendEmailProps): Promise<void> {


    this.transporter.use('compile', hbs({
        viewEngine: 'express-handlebars'
    })); 
        

    const templatePath = path.resolve(__dirname, '..', '..', 'http', 'public', 'index.handlebars')

    const templateStr = await fs.promises.readFile(templatePath, {encoding: 'utf-8'})

    const data = {
        name,
        link
    }

    const template = Handlebars.compile(templateStr)(data);

    const mailOptions = {
        from: 'Staff TrackTOO, <tracktoo@marlonlencina.com>',
        to: email,
        subject: '🔑 - Recuperação de senha',
        html: template
    }
  
    await this.transporter.sendMail(mailOptions);

    }
    
}