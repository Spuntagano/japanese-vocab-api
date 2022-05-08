export interface IWord {
  japanese: string | null;
  english: string | null;
  kanji: string | null;
}

export default abstract class {
  abstract findAll(): Promise<IWord[]>;
}
