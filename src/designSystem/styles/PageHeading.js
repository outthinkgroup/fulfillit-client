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
`;

export const Loader = styled.div`
  width: 32px;
  aspect-ratio: 1;
  display: grid;
  border: 3px solid #0000;
  border-radius: 50%;
  border-right-color: #0070f3;
  animation: s5 1s infinite linear;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: s5 2s infinite;
  }
  &::after {
    margin: 8px;
    animation-duration: 3s;
  }

  @keyframes s5 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
