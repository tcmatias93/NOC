export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel; //Enum
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel; //Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    if (!message) throw new Error("Message is requiered");
    if (!level) throw new Error("Level is requiered");
    if (!createdAt) throw new Error("createdAt is requiered");
    if (!origin) throw new Error("Origin is requiered");

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: createdAt,
      origin: origin,
    });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });

    return log;
  };
}
