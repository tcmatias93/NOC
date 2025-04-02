import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { logRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: logRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

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

      this.logRepository.saveLog(log);

      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not OK. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: "check-services.ts",
      });

      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
