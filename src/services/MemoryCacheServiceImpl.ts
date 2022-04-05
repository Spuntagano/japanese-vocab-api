import CacheService from "./CacheService";

export default class extends CacheService {
  private store: Record<string, string>;

  constructor() {
    super();
    this.store = {};
  }

  public get(key: string) {
    return this.store[key];
  }

  public set(key: string, value: string) {
    this.store[key] = value;
  }
}
