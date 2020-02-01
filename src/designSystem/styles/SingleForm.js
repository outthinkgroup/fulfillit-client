import styled from "styled-components"

export const SingleForm = styled.div`
  max-width: 600px;
  margin: 0 auto;
  ${({ theme }) => theme.above.small`
    margin-top: 100px;
  `}

  .singleform-wrapper {
    box-shadow: ${({ theme }) => theme.depth.high};
    overflow: hidden;
    border-radius: 8px;
    display: grid;
    background: #fff;
    grid-template-rows: 30px 1fr;

    grid-template-rows: 1fr;
    ${({ theme }) => theme.above.small`
      grid-template-columns: 200px 1fr;
    `}
  }
  .left-column {
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.colors.darkBlue};
  }
  .singleform-form-wrapper {
    padding: 20px 30px;
    padding-bottom: 40px;
    form {
      margin-bottom: 20px;
    }

    a {
      color: ${({ theme }) => theme.colors.darkBlue};
      text-decoration: underline;
    }
  }
  label span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkBlue};
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 600;
  }
  input[type="submit"] {
    display: inline-block;
    width: auto;
  }
`
