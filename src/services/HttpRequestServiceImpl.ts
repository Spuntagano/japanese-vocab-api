import http, { IncomingMessage } from "http";
import https from "https";
import { IOptions } from "./RequestService";

export default class {
  public request(options: IOptions): Promise<string> {
    const buffer: Buffer[] = [];
    return new Promise((resolve, reject) => {
      const protocol = options.protocol === "https:" ? https : http;
      const req = protocol.request(options, (res: IncomingMessage) => {
        res.on("data", (data: Buffer) => {
          buffer.push(data);
        });

        res.on("end", () => {
          resolve(Buffer.concat(buffer).toString());
        });
      });

      req.on("error", (error: Error) => {
        reject(error);
      });

      req.end();
    });
  }
}
