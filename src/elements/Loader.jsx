import styled from "styled-components";

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
