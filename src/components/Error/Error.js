import React from "react"
import styled from "styled-components"
export const Error = ({ message }) => {
  return <ErrorMessage>{message}</ErrorMessage>
}
const ErrorMessage = styled.div`
  background: ${({ theme }) => theme.colors.warning.primary};
  border-radius: 4px;
  color: white;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 10px;
`
