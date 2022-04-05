import CacheService from "../services/CacheService";
import ParseService from "../services/ParseService";
import RequestService from "../services/RequestService";
import WordService, { IWord } from "./WordService";

export default class extends WordService {
  private cacheService: CacheService;
  private requestService: RequestService;
  private parseService: ParseService;

  constructor(cacheService: CacheService, requestService: RequestService, parseService: ParseService) {
    super();
    this.cacheService = cacheService;
    this.requestService = requestService;
    this.parseService = parseService;
  }

  public async findAll() {
    if (!this.cacheService.get("words")) {
      const words: IWord[] = [];

      for (let i = 1; i < 55; i++) {
        const options = {
          hostname: "app.memrise.com",
          port: 443,
          path: `/course/30801/minna-no-nihongo-i/${i}/`,
          method: "GET",
          protocol: "https:",
        };

        const content = await this.requestService.request(options);
        const dom = this.parseService.parse(content);
        const rows = dom.getElementsByClassName("thing") as unknown as HTMLElement[];
        rows.forEach((row: HTMLElement) => {
          words.push({
            japanese: row.getElementsByClassName("col_a")[0].textContent,
            english: row.getElementsByClassName("col_b")[0].textContent,
          });
        });
      }

      this.cacheService.set("words", JSON.stringify(words));
    }

    return JSON.parse(this.cacheService.get("words"));
  }
}
