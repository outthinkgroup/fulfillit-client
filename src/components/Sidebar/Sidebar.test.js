import React from "react"
import renderer from "react-test-renderer"
import Sidebar from "./Sidebar"
import { ThemeProvider } from "styled-components"
import theme from "../../designSystem/theme"
describe("Sidebar", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Sidebar />
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
