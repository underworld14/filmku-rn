import api from "../api";

describe("api instance", () => {
  it("test axios instance", () => {
    expect(api.defaults.baseURL).toBe("https://api.themoviedb.org/3");
    expect(api.defaults.timeout).toBe(10000);
    expect(api.defaults.params.api_key).not.toBeNull();
  });
});
