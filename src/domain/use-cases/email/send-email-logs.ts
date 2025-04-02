import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { logRepository } from "../../repository/log.repository";

interface SendLogsEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogsEmailUseCase {
  constructor(
    private readonly emailServide: EmailService,
    private readonly logRespository: logRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailServide.sendEmailWithFilesSystemLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }

      const log = new LogEntity({
        message: `Log email send`,
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });
      this.logRespository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });
      this.logRespository.saveLog(log);
      return false;
    }
  }
}
