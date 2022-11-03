import styled from 'styled-components';

export const UpgradeButton = styled.span`
  height: 100%;
  display: flex;
  justify-content: center;
  a.btn {
    align-self: flex-end;
    display: block;
    width: 100%;
    padding: 12px 20px;
    text-align: center;
    background: ${({ theme }) => theme.colors.lightBlue};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 25px;
  }
`;

