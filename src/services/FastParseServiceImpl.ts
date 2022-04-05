// @ts-ignore
import { FastHTMLParser } from "fast-html-dom-parser";
import ParseService from "./ParseService";

export default class extends ParseService {
  public parse(html: string) {
    return new FastHTMLParser(html);
  }
}
