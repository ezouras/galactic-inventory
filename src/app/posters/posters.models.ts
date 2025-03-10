export enum PosterDataTypes {
  HEROS = 'people',
  STARSHIPS = 'starships',
  PLANETS = 'planets',
}

export type PosterData = {
  [key in PosterDataTypes]: string;
};

export interface PosterCardData {
  type: string;
  stock: string;
  title: string;
  name: string;
  price: string;
}
type GalacticOrEmpty<PosterCardData> = PosterCardData[] | [];

export interface GalacticPosterData {
  [keyof: string]: GalacticOrEmpty<PosterCardData>;
}
