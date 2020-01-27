import styled from "styled-components";

export const PageHeading = styled.div`
  h1 {
    margin-top: 0;
    letter-spacing: -1px;
    color: ${({ theme }) => theme.colors.darkBlue};
  }
  max-width: 650px;
  margin-bottom: 40px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBlue};
`;
