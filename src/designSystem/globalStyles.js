import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`

:root {
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  --primary-color: hsl(212, 100%, 48%);
  --primary-dark: hsl(212, 100%, 20%);
  --primary-light: #b3cfef;

  --warning-color: hsl(0, 74%, 61%);

  --success-color: hsl(140, 60%, 45%);

}
body {
  padding: 0;
  margin: 0;
  font-family: var(--font);
}
body {
  box-sizing: border-box;
}
body *,
body *:after,
body *:before {
  box-sizing: inherit;
  position: relative;
}
h1,
h2,
h3,
h4,
h5,
h6,
nav a, nav .link {
  letter-spacing: -0.2px;
}

a, .link {
  text-decoration: none;
  color: var(--primary-color);
}

.page-width {
  max-width: 962px;
  margin: 0 auto;
}


button{
  &:active, &:focus{
    outline:none !important;
  }
}
  input:not([type="checkbox"]),
  select, 
  textarea {
  width: 100%;
  outline: none;
  border: 1px solid black;
  padding: 10px;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.lightGrey};;
  box-shadow: ${({ theme }) => theme.depth.low};
  }
  input[type="submit"],
  button,
  input[type="button"],
  a.btn {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 8px 15px;
    text-decoration: none;
    border: none;
    box-shadow: ${({ theme }) => theme.depth.low};
  }
  input:not([type="checkbox"]),
  button,
  a.btn,
  textarea{
    border-radius:4px;
  }
  label{
    display: block;
    margin-bottom: 20px;
    span{
      display: inline-block;
      margin-bottom: 10px;
    }
  }

  input[type="submit"]{
    cursor: pointer;
    padding:11px 15px;
    margin-top:10px;
  }
  select{
    height:40px;
  }
  textarea{
    resize:none;
  }
  .emailFieldWithSuffix {
      display: flex;
    }
  `
