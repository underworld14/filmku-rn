import { wait, getGenreById, getGenresByIds, isBookmarked } from "../helpers";
import { store } from "store";

jest.mock("store");
let reduxStore: any = store;

describe("helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("able to wait", async () => {
    const timeout = 1000;
    const start = new Date().getTime();
    await wait(timeout);
    const end = new Date().getTime();
    expect(end - start).toBeGreaterThanOrEqual(timeout);
  });

  it("able to get genre by id", () => {
    const id = 1;
    reduxStore.getState.mockReturnValue({
      genres: {
        data: [{ id: 1, name: "Action" }],
      },
    });

    const genre = getGenreById(id);
    expect(genre).toEqual({ id: 1, name: "Action" });
  });

  it("able to get genres by ids", () => {
    const ids = [1, 2];
    reduxStore.getState.mockReturnValue({
      genres: {
        data: [
          { id: 1, name: "Action" },
          { id: 2, name: "Adventure" },
          { id: 3, name: "Horror" },
        ],
      },
    });

    const genres = getGenresByIds(ids);
    expect(genres).toEqual([
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
    ]);
  });

  it("able to check if movie is bookmarked", () => {
    const id = 1;
    const bookmarks = [
      {
        id: 1,
        title: "The Shawshank Redemption",
      },
      {
        id: 2,
        title: "Avengers: Endgame",
      },
    ];
    const isBookmarkedMovie = isBookmarked(id, bookmarks as any);
    expect(isBookmarkedMovie).toBeTruthy();
  });

  it("able to check if movie is not bookmarked", () => {
    const id = 3;
    const bookmarks = [
      {
        id: 1,
        title: "The Shawshank Redemption",
      },
      {
        id: 2,
        title: "Avengers: Endgame",
      },
    ];
    const isBookmarkedMovie = isBookmarked(id, bookmarks as any);
    expect(isBookmarkedMovie).toBeFalsy();
  });
});
