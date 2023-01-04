import { store } from "store";
import { MovieDetail } from "types/movie";

export const wait = async (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const getGenreById = (id: number) => {
  const genres = store.getState().genres.data;
  return genres.find((genre) => genre.id === id);
};

export const getGenresByIds = (ids: number[]) => {
  const genres = store.getState().genres.data;
  return genres.filter((genre) => ids.includes(genre.id));
};

export const isBookmarked = (id: number, bookmarks: MovieDetail[]) => {
  return bookmarks.some((bookmark) => bookmark.id === id);
};
