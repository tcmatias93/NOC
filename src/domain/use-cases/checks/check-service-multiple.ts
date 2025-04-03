import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { logRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: logRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} worling`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      });

      this.callLogs(log);

      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not OK. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: "check-services.ts",
      });

      this.callLogs(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
