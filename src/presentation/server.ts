import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasources";
import { PostgresLogDatasources } from "../infrastructure/datasources/postgres-log.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
  //new FileSystemDatasource()
  //new MongoLogDatasource()
  new PostgresLogDatasources()
);

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const posgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasources()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
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

    //const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    //console.log(logs);

    //TODO se crean logs en una sola base a la vez
    //CronService.createJob("*/5 * * * * *", () => {
    //  const url = "https://google.com";
    //  new CheckService(
    //    logRepository,
    //    () => console.log(`${url} is ok`),
    //    (error) => console.log(error)
    //  ).execute(url);
    //  // new CheckService().execute( 'http://localhost:3000' ); https://google.com
    //});

    //TODO se crean logs en mas de una base de datos a la vez
    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, posgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute( 'http://localhost:3000' ); https://google.com
    });
  }
}
