import MovieList from "components/MovieList";
import renderer from "react-test-renderer";

describe("MovieList", () => {
  it("renders correctly", () => {
    const tree: any = renderer.create(<MovieList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
