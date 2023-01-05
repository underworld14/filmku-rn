import GenreChip from "components/GenreChip";
import renderer from "react-test-renderer";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";

describe("GenreChip", () => {
  it("renders correctly", () => {
    const tree: any = renderer.create(<GenreChip name="Action" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
