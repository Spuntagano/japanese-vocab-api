export interface IOptions {
  hostname: string;
  port?: number;
  path: string;
  method: string;
  protocol: string;
}

export default abstract class {
  abstract request(options: IOptions): Promise<string>;
}
