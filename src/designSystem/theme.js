import { css } from "styled-components";

//media breakpoints
const size = {
  small: 400,
  medium: 800,
  large: 1100
};

const theme = {
  colors: {
    primary: "#0070f3",
    darkBlue: "hsl(212, 100%, 20%)",
    lightBlue: "hsl(212, 80%, 89%)",
    lightGrey: "hsl(212, 80%, 97%)",

    warning: {
      primary: "hsl(0, 74%, 61%)",
      light: "hsl(0, 74%, 91%)",
      dark: "hsl(0, 74%, 43%)"
    },

    success: {
      primary: "hsl(140, 60%, 45%)",
      light: "hsl(140, 60%, 85%)",
      dark: "hsl(140, 60%, 29%)"
    }
  },
  depth: {
    high:
      "0 50px 100px rgba(50, 50, 93, 0.1), 0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)",
    medium:
      "0 25px 50px rgba(50, 50, 93, 0.05), 0 7px 17px rgba(50, 50, 93, 0.1), 0 2.5px 7.5px rgba(0, 0, 0, 0.08)",
    low:
      "0 12px 25px rgba(50, 50, 93, 0.025), 0 3px 8px rgba(50, 50, 93, 0.07), 0 1.25px 3.25px rgba(0, 0, 0, 0.06)",
    contrastLow:
      "0 12px 25px rgba(50, 50, 93, 0.025), 0 3px 8px rgba(50, 50, 93, 0.07), 0 1.25px 3.25px hsla(212, 100%, 20%, 30%)"
  },

  above: Object.keys(size).reduce((obj, key) => {
    obj[key] = (...args) => css`
      @media (min-width: ${size[key]}px) {
        ${css(...args)}
      }
    `;
    return obj;
  }, {})
};
export default theme;
