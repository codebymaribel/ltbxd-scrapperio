export type FilmObject = {
  id: string | null;
  name: string;
  type: string;
  poster: string | null;
};

export type FilmSearchObject = {
  title: string;
  poster: string | null;
  alternativeTitles: string[] | [];
  year: number;
  director: string | null;
}