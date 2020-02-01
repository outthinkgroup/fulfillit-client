import styled from "styled-components"

export const Hamburger = styled.button`
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  margin-left: -20px;

  padding: 20px;
  color: black;
  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.darkBlue};
  }
  ${({ theme }) => theme.above.small`
    display:none;
  `}
`
