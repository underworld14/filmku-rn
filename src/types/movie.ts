import { Genre } from "store/genreSlice";

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  runtime: number;
  spoken_languages: {
    english_name: string;
  }[];
}
