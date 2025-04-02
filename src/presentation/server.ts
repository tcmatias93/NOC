import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // TODO Mandar el email
    /*     emailService.sendEmail({
      to: "mtorres93@hotmail.com",
      subject: "Logs de sistema",
      htmlBody: `
        <h3>Logs de sistema - NOC</h3>
        <p>Esto es un texto de prueba</p>
        <p>Ver logs adjuntos</p>
      `,
    }); */
    //emailService.sendEmailWithFilesSystemLogs(["mtorres93@hotmail.com"]);
    /* new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      "mtorres93@hotmail.com",
    ]); */

    //TODO se crean logs
    //CronService.createJob("*/5 * * * * *", () => {
    //  const url = "https://google.com";
    //  new CheckService(
    //    fileSystemLogRepository,
    //    () => console.log(`${url} is ok`),
    //    (error) => console.log(error)
    //  ).execute(url);
    // new CheckService().execute( 'http://localhost:3000' ); https://google.com
    //});
  }
}
