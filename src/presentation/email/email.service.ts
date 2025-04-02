import nodeMailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachements[];
}

interface Attachements {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodeMailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      //console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFilesSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Esto es un texto de prueba</p>
        <p>Ver logs adjuntos</p>
      `;
    const attachements: Attachements[] = [
      {
        filename: "logs-all",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({ to, subject, attachements, htmlBody });
  }
}
