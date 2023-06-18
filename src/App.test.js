import { cleanup, render, screen } from "@testing-library/react";
import { MyButton } from "./components/Button";

describe("Button styled component", () => {
  afterEach(cleanup);
  test("The button component changes its colors depending on the props - test 1", () => {
    const props = {
      background: "#135846",
      color: "#ffffff",
      border: "solid 1px #135846",
    };
    render(<MyButton {...props} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color: #135846");
    expect(button).toHaveStyle("color: #ffffff");
  });
  test("The button component changes its colors depending on the props - test 2", () => {
    const props = {
      background: "#EEF9F2",
      color: "#212121",
      border: "solid 1px #EEF9F2",
    };
    render(<MyButton {...props} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color: #EEF9F2");
    expect(button).toHaveStyle("color: #212121");
  });
});

/* import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */
