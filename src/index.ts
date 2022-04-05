import http from "http";
import "dotenv/config";
import WordRouter from "./routes/WordRouter";
import MemoryCacheServiceImpl from "./services/MemoryCacheServiceImpl";
import HttpRequestServiceImpl from "./services/HttpRequestServiceImpl";
import FastParseServiceImpl from "./services/FastParseServiceImpl";
import WordService from "./services/WordServiceImpl";

const memoryCacheService = new MemoryCacheServiceImpl();
const HttpRequestService = new HttpRequestServiceImpl();
const FastParseService = new FastParseServiceImpl();
const wordService = new WordService(memoryCacheService, HttpRequestService, FastParseService);
const wordRouter = new WordRouter(wordService);

const server = http.createServer((req, res) => {
  // todo: better routing :)
  if (req.url === "/api/words") {
    if (req.method === "GET") {
      wordRouter.get(req, res);
    }
  }
});

server.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
