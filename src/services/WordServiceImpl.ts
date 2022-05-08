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
      const words: Record<string, IWord> = {};

      for (let i = 1; i <= 80; i++) {
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
          const japanese = row.getElementsByClassName("col_a")[0].textContent || "";

          if (!words[japanese]) {
            words[japanese] = {
              japanese,
              english: "",
              kanji: "",
            };
          }

          if (i <= 55) {
            words[japanese].english = row.getElementsByClassName("col_b")[0].textContent || "";
          } else {
            words[japanese].kanji = row.getElementsByClassName("col_b")[0].textContent || "";
          }
        });
      }

      this.cacheService.set("words", JSON.stringify(Object.values(words)));
    }

    return JSON.parse(this.cacheService.get("words"));
  }
}
