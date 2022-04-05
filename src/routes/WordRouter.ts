import { IncomingMessage, ServerResponse } from "http";
import WordService from "../services/WordServiceImpl";

export default class {
  private wordService: WordService;

  constructor(wordService: WordService) {
    this.wordService = wordService;
  }

  async get(req: IncomingMessage, res: ServerResponse) {
    const words = await this.wordService.findAll();

    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(words));
  }
}
