import "./labeled-input.component.js";
import { TestUtils } from "./test-utils.js";

describe("LabeledInput Component", () => {
  it("displays default label", async () => {
    const {root} = await TestUtils.render('labeled-input');
    const value = root.innerHTML.includes("Label");
    expect(value).toBeTruthy();
  });
});